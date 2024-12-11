import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { LogsModelo } from "../modelos/LogsModelo";
import api from "../Services/Api";

export default function Logs() {
  const [listaLogs, setListaLogs] = useState<LogsModelo[]>([]);
  const getLogs = () => {
    try {
      api.get("logs").then((response) => {
        setListaLogs(response.data);
      });
    } catch (error) {
      Alert.alert("Error", "ocurrio un error" + error);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);
  return (
    <View >
      <FlatList
        data={listaLogs}
        keyExtractor={(item: LogsModelo) => item.IdLog.toString()}
        renderItem={({ item }) => (
          <Text style={style.Log}>
            ID:{item.IdLog}     X:{item.postitionX}     Y:{item.positionY}     Fecha:
            {item.fecha}
          </Text>
        )}
      ></FlatList>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  Log:{
    padding: 2,
    borderWidth: 2,
    borderColor: 'blue',
    margin:2
  }
});

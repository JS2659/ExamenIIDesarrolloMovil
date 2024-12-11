import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Accelerometer } from 'expo-sensors';
import api from '../Services/Api';

export default function Acelerometro() {

    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
      });

    const [color, setColor] = useState<string>('')

      function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      const [pocisionCirculo, setPocisionCirculo]= useState({
        x:150,
        y:300,
        z:100
      });

      const updatePosicionCirculo = ({x,y,z}:any) =>{
        setPocisionCirculo((prev)=>({
            x: Math.min(Math.max(prev.x - x *10, 0),300),
            y: Math.min(Math.max(prev.y + y *10, 0),600),
            z: Math.min(Math.max(prev.z + z *10, 0),600),
        }))
      }
      
      const postLog= async (data:any)=>{
        try {
            const response = await api.post('logs',data)
        } catch (error) {
           
        }
      }

      useEffect(()=>{
            const suscripcion = Accelerometer.addListener((acelerometroData)=>{
                setData(acelerometroData)
                updatePosicionCirculo(acelerometroData)                
            })
            Accelerometer.setUpdateInterval(1000)

            return () => suscripcion.remove()
      },[])

     useEffect(()=>{
        const now = new Date
        const postitionX:number = pocisionCirculo.x
        const positionY:number = pocisionCirculo.y
        const data = {
            postitionX,
            positionY,
            fecha: now
        }
        setColor(getRandomColor)
        postLog(data)
     },[pocisionCirculo])

  return (
    <View style={style.container}>
      
      <View style={[
            style.circulo,
            {
                left: pocisionCirculo.x,
                top: pocisionCirculo.y,
                right: pocisionCirculo.z,
                backgroundColor: color
            }
        ]
      
      }>

      </View>
    </View>
  )
}

const style = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent: 'center',
        position:'relative'
    },
    circulo:{
        position:'absolute',
        width:50,
        height:50,
        borderRadius:25
    },
   })
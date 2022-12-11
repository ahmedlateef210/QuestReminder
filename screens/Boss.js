import { Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform } from 'react-native';
import AppStyles from '../styles/AppStyles';
//import InlineTextButton from '../components/InlineTextButton';
import { db } from '../firebaseConfig'
import BackButton from '../components/BackButton';
import React, { useEffect, useState } from 'react';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore"; 

export default function Boss({ navigation }) {
  const background = require("../assets/boss.jpg");
  const docRef = doc(db, "boss", "1")
  const [boss, setBoss] = useState({})

  useEffect(() => {
    const getBoss = async () => {
        const snap = await getDoc(docRef)
        setBoss ({...snap.data()})
    }
    getBoss ()
  }, [])

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <View
      style={[AppStyles.rowContainer, AppStyles.leftAligned, AppStyles.leftMargin]}>
        <BackButton text="Home" onPress={() => navigation.navigate("Home")}/>
      </View>
      <View style={AppStyles.backgroundCover} >
        <Text style={[AppStyles.lightText, AppStyles.header]}>{boss.boss_name}</Text>
      </View>
    </ImageBackground>
  );
}
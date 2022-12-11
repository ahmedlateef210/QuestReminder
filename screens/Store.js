import { Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlineTextButton';
import BackButton from '../components/BackButton';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore"; 
import React, { useEffect, useState } from 'react';

export default function Store({ navigation }) {
  const background = require("../assets/background.jpg");
  const docRef = doc(db, "users", auth.currentUser.uid)
  const [user, setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
        const snap = await getDoc(docRef)
        setUser ({...snap.data()})
    }
    getUser ()
  }, [])

  let buyPotion = () => {
    const userRef = doc(db, "users", auth.currentUser.uid)
    setDoc(userRef, { user_coins: user_coins - 50}, { merge: true});
    setDoc(userRef, { user_potionCount: user_potionCount + 1}, { merge: true});
  }

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <View
      style={[AppStyles.rowContainer, AppStyles.leftAligned, AppStyles.leftMargin]}>
        <BackButton text="Home" onPress={() => navigation.navigate("Home")}/>
      </View>
      <View
      style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]}>
        <Text style={[AppStyles.lightText]}>Coins: {user.user_Coins}</Text>
      </View>
      <View style={AppStyles.backgroundCover} >
        <Text style={[AppStyles.lightText, AppStyles.header]}>Store</Text>
      </View>
      <View style={[AppStyles.rowContainer, AppStyles.backgroundCover]}>
        <Text style={[AppStyles.lightText, AppStyles.rightAligned]}>Health Potions: 50 Coins</Text>
      </View>
      <InlineTextButton text="Buy a Potion" onPress={buyPotion}/>
    </ImageBackground>
  );
}
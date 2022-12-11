import { Button, View, TextInput, Text, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlineTextButton';
import BackButton from '../components/BackButton'
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc, getDoc } from "firebase/firestore"; 
import { signOut, updatePassword, signInWithEmailAndPassword, deleteUser } from 'firebase/auth';

export default function UserProfile({ navigation }) {
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

  let logout = () => {
    signOut(auth).then(() => {
      navigation.popToTop();
    });
  }
  let usePotion = () => {
    if (user.user_potionCount > 0) {
      user.user_potionCount -= 1
      user.user_health += 50
    }
  }
  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <View
      style={[AppStyles.rowContainer, AppStyles.leftAligned, AppStyles.leftMargin, AppStyles.topMargin]}>
        <BackButton text="Home" onPress={() => navigation.navigate("Home")}/>
      </View>
      <View style={AppStyles.backgroundCover} >
        <Text style={[AppStyles.lightText, AppStyles.header, AppStyles.topMargin]}>User Profile</Text>
      </View>
      <View style={[AppStyles.rowContainer, AppStyles.backgroundCover]}>
        <Text style={[AppStyles.lightText]}>Hero health: {user.user_health}</Text>
        <InlineTextButton text="Use a Potion" onPress={usePotion}/>
      </View>
      <Button title="Logout" onPress={logout} />
    </ImageBackground>
  );
}
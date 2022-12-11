import { Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform } from 'react-native';
import AppStyles from '../styles/AppStyles';
import InlineTextButton from '../components/InlineTextButton';
import React from 'react';

export default function Home({ navigation }) {
  const background = require("../assets/background.jpg");

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <View style={AppStyles.backgroundCover} >
        <Text style={[AppStyles.lightText, AppStyles.header]}>Home</Text>
      </View>
      <View style={[AppStyles.rowContainer, AppStyles.topMargin, AppStyles.backgroundCover]}>
          <InlineTextButton text="Schedule" onPress={() => navigation.navigate("Schedule")} />
      </View>
      <View style={[AppStyles.rowContainer, AppStyles.backgroundCover]}>
          <InlineTextButton text="ToDo" onPress={() => navigation.navigate("ToDo")} />
      </View>
      <View style={[AppStyles.rowContainer, AppStyles.backgroundCover]}>
          <InlineTextButton text="Store" onPress={() => navigation.navigate("Store")} />
      </View>
      <View style={[AppStyles.rowContainer, AppStyles.backgroundCover]}>
          <InlineTextButton text="View Boss" onPress={() => navigation.navigate("Boss")} />
      </View>
      <View style={[AppStyles.rowContainer, AppStyles.backgroundCover]}>
          <InlineTextButton text="User Profile" onPress={() => navigation.navigate("UserProfile")} />
      </View>
    </ImageBackground>
  );
}
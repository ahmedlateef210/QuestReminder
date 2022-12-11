import { Text, View, TextInput, ImageBackground, Button, KeyboardAvoidingView, Platform, SafeAreaView, Modal, ActivityIndicator, FlatList } from 'react-native';
import AppStyles from '../styles/AppStyles';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { sendEmailVerification } from 'firebase/auth';
import InlineTextButton from '../components/InlineTextButton';
import BackButton from '../components/BackButton';
import React from 'react';
import AddScheduleModal from '../components/AddScheduleModal';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default function Schedule({ navigation }) {
  const background = require("../assets/background.jpg");
  
  let [modalVisible, setModalVisible] = React.useState(false);
  let [isLoading, setIsLoading] = React.useState(true);
  let [isRefreshing, setIsRefreshing] = React.useState(false);
  let [events, setEvents] = React.useState([]);

  let loadEventList = async () => {
    const q = query(collection(db, "events"), where("event_user", "==", auth.currentUser.uid));

    const querySnapshot = await getDocs(q);
    let events = [];
    querySnapshot.forEach((doc) => {
      let event = doc.data();
      event.id = doc.id;
      events.push(event);
    });

    setEvents(events);
    setIsLoading(false);
    setIsRefreshing(false);
  };

  if (isLoading) {
    loadEventList();
  }

  let checkEventItem = (item, isChecked) => {
    const eventRef = doc(db, 'events', item.id);
    setDoc(eventRef, { completed: isChecked }, { merge: true });
    const userRef = doc(db, "users", auth.currentUser.uid)
    setDoc(userRef, { user_coins: user_coins + 50}, { merge: true});
  };

  let deleteEvent = async (eventId) => {
    await deleteDoc(doc(db, "events", eventId));
    let updatedEvents = [...events].filter((item) => item.id != eventId);
    setToDos(updatedevents);
  };

  let renderEventItem = ({item}) => {
    return (
      <View style={[AppStyles.rowContainer, AppStyles.rightMargin, AppStyles.leftMargin]}>
        <View style={AppStyles.fillSpace}>
          <BouncyCheckbox
            isChecked={item.complated}
            size={25}
            fillColor="#258ea6"
            unfillColor="#FFFFFF"
            text={item.text}
            iconStyle={{ borderColor: "#258ea6" }}
            onPress={(isChecked) => { checkEventItem(item, isChecked)}}
          />
        </View>
        <InlineTextButton text="Delete" color="#258ea6" onPress={() => deleteEvent(item.id)} />
      </View>
    );
  }

  let showEventList = () => {
    return (
      <FlatList
        data={events}
        refreshing={isRefreshing}
        onRefresh={() => {
          loadEventList();
          setIsRefreshing(true);
        }}
        renderItem={renderEventItem}
        keyExtractor={item => item.id} />
    )
  };

  let showContent = () => {
    return (
      <View>
        <Button 
          title="Add Event" 
          onPress={() => setModalVisible(true)} 
          color="#fb4d3d" />
      </View>
    );
  };
  
  let addEvent= async (eventName, eventDay, eventStart, eventRecur, eventNotif) => {
    let eventToSave = {
      event_name: eventName,
      event_day: eventDay,
      event_start: eventStart,
      event_repeat: eventRecur,
      event_notif: eventNotif,
      event_check: false,
      event_user: auth.currentUser.uid
    };
    const docRef = await addDoc(collection(db, "events"), eventToSave);

    eventToSave.id = docRef.id;

    let updatedEvents = [...events];
    updatedEvents.push(eventToSave);

    setEvents(updatedEvents);
  };

  let showSendVerificationEmail = () => {
    return (
      <View>
        <Text>Please verify your email to use Schedule</Text>
        <Button title="Send Verification Email" onPress={() => sendEmailVerification(auth.currentUser)} />
      </View>
    );
  };

  return (
    <ImageBackground style={AppStyles.imageContainer} source={background}>
      <SafeAreaView
      style={[AppStyles.rowContainer, AppStyles.leftAligned, AppStyles.leftMargin, AppStyles.topMargin]}>
        <BackButton text="Home" onPress={() => navigation.navigate("Home")}/>
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <AddScheduleModal 
          onClose={() => setModalVisible(false)}
          addEvent ={addEvent} />
      </Modal>
      <SafeAreaView style={AppStyles.backgroundCover} >
        <Text style={[AppStyles.lightText, AppStyles.header, AppStyles.topMargin]}>Schedule</Text>
      </SafeAreaView>
      {auth.currentUser.emailVerified ? [showContent(), showEventList()] : showSendVerificationEmail()}
    </ImageBackground>
  );
}
import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import AppStyles from '../styles/AppStyles';

export default function AddScheduleModal(props) {
  let [eventName, setEventName] = React.useState("");
  let [eventDay, setEventDay] = React.useState("");
  let [eventStart, setEventStart] = React.useState("");
  let [eventRecur, setEventRecur] = React.useState("");
  let [eventNotif, setEventNotif] = React.useState("");
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add To Schedule</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput]} 
          placeholder='Event Name'
          value={eventName}
          onChangeText={setEventName} />
      <Text style={AppStyles.header}>Which Day?</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput]} 
          placeholder='Event Day'
          value={eventDay}
          onChangeText={setEventDay} />
      <Text style={AppStyles.header}>What Time?</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput]} 
          placeholder='Event Start Time'
          value={eventStart}
          onChangeText={setEventStart} />
      <Text style={AppStyles.header}>Recurrance</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput]} 
          placeholder='No of Repeats'
          value={eventRecur}
          onChangeText={setEventRecur} />
      <Text style={AppStyles.header}>Notification Type</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput]} 
          placeholder='Notification Type'
          value={eventNotif}
          onChangeText={setEventNotif} />
      <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]}>
        <Button title="Cancel" onPress={props.onClose} />
        <Button title="OK" onPress={() => {
          props.addEvent(eventName, eventDay, eventStart, eventRecur, eventNotif);
          setEventName("");
          setEventDay("");
          setEventStart("");
          setEventRecur("");
          setEventNotif("");
          props.onClose();
        }} />
      </View>
    </View>
  );
}
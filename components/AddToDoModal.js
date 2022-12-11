import { View, Text, TextInput, Button } from 'react-native';
import React from 'react';
import AppStyles from '../styles/AppStyles';

export default function AddToDoModal(props) {
  let [todoName, setTodoName] = React.useState("");
  let [todoFreq, setTodoFreq] = React.useState("");
  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Add ToDo</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput]} 
          placeholder='ToDo'
          value={todoName}
          onChangeText={setTodoName} />
      <Text style={AppStyles.header}>Frequency</Text>
      <TextInput 
          style={[AppStyles.textInput, AppStyles.lightTextInput]} 
          placeholder='Daily/Weekly'
          value={todoFreq}
          onChangeText={setTodoFreq} />
      <View style={[AppStyles.rowContainer, AppStyles.rightAligned, AppStyles.rightMargin]}>
        <Button title="Cancel" onPress={props.onClose} />
        <Button title="OK" onPress={() => {
          props.addToDo(todoName, todoFreq);
          setTodoName("");
          setTodoFreq("");
          props.onClose();
        }} />
      </View>
    </View>
  );
}
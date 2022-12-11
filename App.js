import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Schedule from './screens/Schedule';
import ToDo from './screens/ToDo';
import Store from './screens/Store';
import Boss from './screens/Boss';
import UserProfile from './screens/UserProfile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}} />
        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={{headerShown: false}} />
        <Stack.Screen
          name="ToDo"
          component={ToDo}
          options={{headerShown: false}} />
        <Stack.Screen
          name="Store"
          component={Store}
          options={{headerShown: false}} />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{headerShown: false}} />
          <Stack.Screen
          name="Boss"
          component={Boss}
          options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
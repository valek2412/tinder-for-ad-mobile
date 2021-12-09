import React from 'react';
import {LoginScreen1} from './screens/LoginScreen1';
import {LoginScreen2} from './screens/LoginScreen2';
import {RegistrationScreen1} from './screens/RegistrationScreen1';
import {RegistrationScreen2} from './screens/RegistrationScreen2';
import {RegistrationScreen3} from './screens/RegistrationScreen3';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {SaleBonus} from './screens/saleBonus';

import Main from './screens/src/Main';
import {DrawerContent} from './screens/Drawer'

const Stack = createStackNavigator();
function Root() {
  return (
    <NavigationContainer>
    <Stack.Navigator >

      <Stack.Screen options={{headerShown: false}} name="Reg1" component={RegistrationScreen1} />
      <Stack.Screen options={{headerShown: false}} name="Log1" component={LoginScreen1} />
      <Stack.Screen options={{headerShown: false}} name="Log2" component={LoginScreen2} />
      <Stack.Screen options={{headerShown: false}} name="Main" component={Main} />
      <Stack.Screen options={{headerShown: false}} name="SaleBonus" component={SaleBonus} />
      <Stack.Screen options={{headerShown: false}} name="Reg2" component={RegistrationScreen2} />
      <Stack.Screen options={{headerShown: false}} name="Reg3" component={RegistrationScreen3} />
      <Stack.Screen options={{headerShown: false}} name="Drawer" component={DrawerContent} />
      <Stack.Screen options={{headerShown: false}} name="App" component={App} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
const Drawer = createDrawerNavigator(); 
function App() {

  return (

      <Drawer.Navigator initialRouteName="Root"  
      drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Root" component={Main} />
        <Drawer.Screen name="UserRoot" component={SaleBonus} />
        <Drawer.Screen name="Exit" component={LoginScreen1} />
        <Drawer.Screen name="Root1" component={Root} />
      </Drawer.Navigator>

  );
}
export default Root;




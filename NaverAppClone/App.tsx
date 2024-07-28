import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from './screens/HomeScreen';
import {ShoppingScreen} from './screens/ShoppingScreen';
import {RootStackParamList, RouteName} from './routes';
import {BrowserScreen} from './screens/BrowserScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeIcon = ({focused, color}: {focused: boolean; color: string}) => {
  const iconName = focused ? 'home' : 'home-outline';
  return <MaterialCommunityIcons name={iconName} color={color} size={26} />;
};

const ShoppingIcon = ({focused, color}: {focused: boolean; color: string}) => {
  const iconName = focused ? 'shopping' : 'shopping-outline';
  return <MaterialCommunityIcons name={iconName} color={color} size={26} />;
};

const HomeTab = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: 'black',
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'white',
      headerShown: false,
    }}>
    <Tab.Screen
      name={RouteName.HOME}
      component={HomeScreen}
      options={{tabBarLabel: '홈', tabBarIcon: HomeIcon}}
    />
    <Tab.Screen
      name={RouteName.SHOPPING}
      component={ShoppingScreen}
      options={{tabBarLabel: '쇼핑', tabBarIcon: ShoppingIcon}}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={RouteName.HOME_TAB}
          component={HomeTab}
          options={{headerShown: false}}
        />
        <Stack.Screen name={RouteName.BROWSER} component={BrowserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
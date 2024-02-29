import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard';
import Home from './components/Home';
import {
  BORDER_COLOR,
  TEXT_ON_DARK,
  GREEN_BACKGROUND} from "./constants/Colors"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{backgroundColor: "transparent"}}

        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused
                ? "information"
                : "information-outline";
            } else if (route.name === "Gameboard") {
              iconName = focused
                ? "dice-multiple"
                : "dice-multiple-outline";
            } else if (route.name === "Scoreboard") {
              iconName = focused
                ? "view-list"
                : "view-list-outline";
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: GREEN_BACKGROUND,
          tabBarInactiveTintColor: TEXT_ON_DARK,
          tabBarStyle: { backgroundColor: BORDER_COLOR },
          headerStyle: {
            backgroundColor: BORDER_COLOR
          },
          headerTintColor: TEXT_ON_DARK
        })}
      >
        <Tab.Screen name='Home' component={Home} options={{tabBarStyle: {display: "none"}}}/>
        <Tab.Screen name='Gameboard' component={Gameboard} />
        <Tab.Screen name='Scoreboard' component={Scoreboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
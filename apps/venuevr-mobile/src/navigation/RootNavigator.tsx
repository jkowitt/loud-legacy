import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "../screens/HomeScreen";
import { EventsScreen } from "../screens/EventsScreen";
import { WalletScreen } from "../screens/WalletScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

export type RootTabParamList = {
  Home: undefined;
  Events: undefined;
  Wallet: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarStyle: {
          backgroundColor: "#0b111b",
          borderTopColor: "rgba(148,163,184,0.2)"
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
            Home: "home",
            Events: "ios-videocam",
            Wallet: "card",
            Settings: "settings"
          };
          const name = iconMap[route.name];
          return <Ionicons name={name} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

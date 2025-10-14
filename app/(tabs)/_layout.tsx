import { Colors } from "@/constants/Colors";

import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, useColorScheme, View } from "react-native";

const TabIcon = ({ title, icon, focused }: any) => {
  return (
    <View
      className={`flex-1 w-full min-w-[80px] min-h-[56px] flex-col text-white rounded-2xl items-center justify-center ${focused ? "bg-lime-600" : "bg-transparent"}`}
    >
      <Image source={icon} className="w-6 h-6" tintColor={"#ffff"} />
      <Text className="text-white text-sm">{title}</Text>
    </View>
  );
};

const Layout = () => {
  const colorScheme = useColorScheme() ?? "dark";
  //console.log(colorScheme);
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarStyle: {
            backgroundColor: theme.navBackground,
            height: 100,
            borderWidth: 1,
            borderColor: "#0f0d23",
            paddingTop: 24,
            paddingBottom: 8,
            paddingHorizontal: 8,
          },
        }}
      >
        <Tabs.Screen
          name="workouts"
          options={{
            title: "Workouts",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                title="Workouts"
                focused={focused}
                icon={require("../../assets/icons/dumbbell-alt.png")}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="schedule"
          options={{
            title: "Schedule",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                title="Schedule"
                focused={focused}
                icon={require("../../assets/icons/calendar-alt.png")}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: "Progress",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                title="Progress"
                focused={focused}
                icon={require("../../assets/icons/chart-line.png")}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;

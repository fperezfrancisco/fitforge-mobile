import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Appearance,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const Profile = () => {
  const colorScheme = useColorScheme() ?? "dark";

  //console.log(colorScheme);
  //const theme = Colors[colorScheme] ?? Colors.light;
  const [theme, setTheme] = useState(Colors[colorScheme] ?? Colors.light);

  const handleThemeChange = () => {
    // Implement theme change logic here

    Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark");
    console.log("Color scheme: ", Appearance.getColorScheme());
  };

  const [isDarkMode, setIsDarkMode] = React.useState(colorScheme === "dark");

  const toggleSwitch = () => {
    setIsDarkMode(!isDarkMode);
    handleThemeChange();
  };

  useEffect(() => {
    setTheme(Colors[colorScheme] ?? Colors.light);
  }, [colorScheme]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Profile",
          headerStyle: {
            backgroundColor: theme.navBackground,
          },
          headerTitleStyle: {
            color: theme.navText,
            fontWeight: "bold",
            fontSize: 16,
          },
          headerTitleAlign: "center",
          headerBackTitle: "Back",
        }}
      />
      <ScrollView
        style={{
          backgroundColor: theme.background,
        }}
        className="w-full h-full"
      >
        <View className="w-full px-4 py-4 flex flex-col items-center gap-8">
          <View className="size-[140px] bg-lime-600 rounded-full"></View>
          <View className="w-full flex flex-col items-center text-center px-4">
            <Text style={{ color: theme.text }} className="font-bold text-xl">
              Francisco Perez
            </Text>
            <Text
              style={{ color: theme.text }}
              className="font-medium text-base truncate"
            >
              fperezfrancisco4@gmail.com
            </Text>
            <View className="mt-8 flex flex-row gap-4">
              <TouchableOpacity className="px-4 py-2 border border-neutral-200 rounded-2xl w-full h-[48px] flex items-center justify-center">
                <Text
                  style={{ color: theme.text }}
                  className="font-bold text-lg"
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-full my-2 h-[1px] bg-neutral-200"></View>
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;

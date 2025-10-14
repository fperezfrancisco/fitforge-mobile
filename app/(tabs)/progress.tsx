import PageHeader from "@/components/PageHeader";
import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";
import { Text, useColorScheme, View } from "react-native";

const Progress = () => {
  const colorScheme = useColorScheme() ?? "dark";
  //console.log(colorScheme);
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Progress",
          header: () => <PageHeader title="Progress" />,
        }}
      />
      <View
        style={{
          backgroundColor: theme.background,
        }}
        className="flex-1 items-center justify-center w-screen h-screen"
      >
        <Text style={{ color: theme.text }}>progress</Text>
      </View>
    </>
  );
};

export default Progress;

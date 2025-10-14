import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, useColorScheme, View } from "react-native";

const PageHeader = ({ title }: { title: string }) => {
  const colorScheme = useColorScheme() ?? "dark";
  //console.log(colorScheme);
  const theme = Colors[colorScheme] ?? Colors.light;
  const router = useRouter();

  const handleRouteToProfile = () => {
    //navigation.navigate("Profile");
    console.log("Navigate to Profile");
    router.push("/Profile");
  };

  return (
    <View
      style={{
        backgroundColor: colorScheme === "dark" ? "#000000" : "#ffffff",
      }}
      className="pt-[48px] px-6 pb-2 w-full flex flex-row items-center justify-between relative"
    >
      <Text
        className="text-base text-center mr-2 font-bold"
        style={{ color: theme.text }}
      >
        FitForge
      </Text>
      <Text style={{ color: theme.text }} className="text-lg font-medium">
        {title}
      </Text>
      <View
        className="size-12 rounded-full bg-lime-600 flex items-center justify-center"
        onTouchEnd={handleRouteToProfile}
      >
        <Image source={require("../assets/icons/user.png")} />
      </View>
    </View>
  );
};

export default PageHeader;

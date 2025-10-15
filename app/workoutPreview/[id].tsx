import { Colors } from "@/constants/Colors";
import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const Tags = () => {
  const colorScheme = useColorScheme() ?? "dark";
  return (
    <View
      style={{ backgroundColor: Colors[colorScheme].background }}
      className="px-4 py-1 rounded-lg border border-neutral-200"
    >
      <Text style={{ color: Colors[colorScheme].text }} className="text-sm">
        Tag 1
      </Text>
    </View>
  );
};

const WorkoutPreviewLi = () => {
  const colorScheme = useColorScheme() ?? "dark";
  return (
    <TouchableOpacity className="w-full rounded-2xl border border-neutral-200 p-2 px-4 bg-black/50 flex items-center h-[72px] justify-between flex-row">
      <View className="flex flex-row items-center gap-4">
        <View className="flex flex-col items-start">
          <Text
            style={{ color: Colors[colorScheme].text }}
            className="text-lg font-medium leading-tight"
          >
            Exercise title
          </Text>
          <View className="flex flex-row items-center gap-2">
            <Text
              style={{ color: Colors[colorScheme].text }}
              className="text-sm font-medium"
            >
              Sets 3
            </Text>
            <View className="h-full w-[1px] bg-neutral-200"></View>
            <Text
              style={{ color: Colors[colorScheme].text }}
              className="text-sm font-medium"
            >
              Reps 8 - 12
            </Text>
          </View>
        </View>
      </View>
      <Image
        style={{ tintColor: "white" }}
        className="size-6"
        source={require("../../assets/icons/chevron-right.png")}
      />
    </TouchableOpacity>
  );
};

const WorkoutPreview = () => {
  const colorScheme = useColorScheme() ?? "dark";

  //console.log(colorScheme);
  //const theme = Colors[colorScheme] ?? Colors.light;
  const [theme, setTheme] = useState(Colors[colorScheme] ?? Colors.light);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView className="w-full flex flex-col flex-1 bg-lime-700 pb-16">
        <View className="aspect-square w-full h-auto bg-neutral-200 relative">
          <Link
            href={"/(tabs)/workouts"}
            className="absolute top-8 left-4 z-20 flex flex-row items-start gap-2"
          >
            <Text
              className="text-lg font-bold"
              style={{ color: Colors[colorScheme].text }}
            >
              Back
            </Text>
          </Link>

          <Image
            source={require("../../assets/images/browse/running-default.webp")}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute w-full h-full bg-black opacity-30 z-10"></View>
          <View className="absolute bottom-4 mx-auto z-20 w-full px-4">
            <Text style={{ color: "white" }} className="font-bold text-4xl">
              Workout Title
            </Text>
            <Text style={{ color: "white" }} className="text-lg font-bold">
              Created by Author
            </Text>
            <View className="w-full flex flex-wrap gap-2 mt-2 flex-row">
              <Tags />
            </View>
            <Text
              style={{ color: Colors[colorScheme].text }}
              className="text-lg mt-4 font-bold"
            >
              Workout Description
            </Text>
            <Text
              style={{ color: Colors[colorScheme].text }}
              className="text-lg leading-tight"
              numberOfLines={2}
            >
              This is a detailed description of the workout. It provides
              insights to this workout.
            </Text>
          </View>
        </View>
        <View className="w-full px-4 pt-4 mb-4">
          <Text className="text-lg font-bold text-white">Exercise List</Text>
          <View className="flex flex-col items-start w-full gap-2 mt-2">
            <WorkoutPreviewLi />
            <WorkoutPreviewLi />
            <WorkoutPreviewLi />
            <WorkoutPreviewLi />
            <WorkoutPreviewLi />
          </View>
        </View>
        <View className="w-full px-4 pb-8">
          <TouchableOpacity className="w-full h-16 bg-black  my-2 rounded-2xl px-4 flex flex-row items-center justify-center">
            <Text className="text-white font-bold text-lg">Start Workout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default WorkoutPreview;

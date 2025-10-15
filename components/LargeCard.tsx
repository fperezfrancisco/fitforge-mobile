import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const LargeCard = () => {
  return (
    <TouchableOpacity
      onPress={() => router.push("/workoutPreview/1")}
      className="aspect-[3/2] h-full min-h-[160px] w-auto border border-neutral-200 rounded-2xl bg-neutral-400 relative"
    >
      <View className="absolute w-full h-full bg-black opacity-50 rounded-2xl z-10"></View>
      <View className="absolute bottom-4 left-4 z-20">
        <Text style={{ color: "white" }} className="font-bold text-lg">
          Workout Title
        </Text>
        <Text style={{ color: "white" }} className="text-sm">
          Subtitle or Description
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LargeCard;

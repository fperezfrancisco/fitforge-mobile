import { WorkoutType } from "@/types/workout";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <View className="flex flex-row overflow-hidden gap-2">
      {tags.map((tag, index) => (
        <View
          key={index}
          className="bg-black px-2 py-1 rounded-md border border-neutral-200 flex items-center justify-center"
        >
          <Text className="text-white text-xs capitalize">{tag}</Text>
        </View>
      ))}
    </View>
  );
};

interface LargeCardProps {
  workout: WorkoutType;
}

const LargeCard = ({ workout }: LargeCardProps) => {
  //console.log("Large card");
  const getImageSource = () => {
    if (!workout.image) {
      return require("../assets/images/browse/running-default.webp");
    }
    console.log("Workout image: ", workout.image);
    // Add your image mappings here
    const imageMap: { [key: string]: any } = {
      "running-default.webp": require("../assets/images/browse/running-default.webp"),
      // Add more mappings as needed
      // "other-image.webp": require("../assets/images/browse/other-image.webp"),
      "/workouts/pull.jpg": require("../assets/images/workouts/pull.jpg"),
      "/workouts/push.jpg": require("../assets/images/workouts/push.jpg"),
      "/workouts/legs.jpg": require("../assets/images/workouts/legs.jpg"),
      "/workouts/full-a.jpg": require("../assets/images/workouts/full-a.jpg"),
      "/workouts/full-b.jpg": require("../assets/images/workouts/full-b.jpg"),
    };

    return (
      imageMap[workout.image] ||
      require("../assets/images/browse/running-default.webp")
    );
  };

  return (
    <TouchableOpacity
      onPress={() => router.push(`/workoutPreview/${workout.id}`)}
      className="aspect-[3/2] h-full min-h-[160px] w-auto border border-neutral-200 rounded-2xl bg-neutral-400 relative overflow-hidden"
    >
      <Image
        source={getImageSource()}
        className="absolute bg-lime-200 w-full h-full rounded-2xl object-cover object-center"
        resizeMode="cover"
      />
      <View className="absolute w-full h-full bg-black opacity-50 rounded-2xl z-10"></View>
      <View className="absolute bottom-2 left-2 z-20">
        <Text style={{ color: "white" }} className="font-bold text-lg mb-2">
          {workout.name || "Workout Title"}
        </Text>
        <Tags tags={workout.tags || []} />
      </View>
    </TouchableOpacity>
  );
};

export default LargeCard;

import { Colors } from "@/constants/Colors";
import { ExerciseType } from "@/types/workout";
import { http } from "@/utils/api";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const Tags = ({ tag }: { tag: string }) => {
  const colorScheme = useColorScheme() ?? "dark";
  return (
    <View
      style={{ backgroundColor: Colors[colorScheme].background }}
      className="px-4 py-1 w-fit rounded-lg border border-neutral-200"
    >
      <Text
        style={{ color: Colors[colorScheme].text }}
        className="text-sm capitalize"
      >
        {tag}
      </Text>
    </View>
  );
};

const ExercisePreview = () => {
  const colorScheme = useColorScheme() ?? "dark";

  const { exerciseId } = useLocalSearchParams();
  //console.log(colorScheme);
  //const theme = Colors[colorScheme] ?? Colors.light;
  const [theme, setTheme] = useState(Colors[colorScheme] ?? Colors.light);
  const [exerciseData, setExerciseData] = useState<ExerciseType | null>(null);

  const getImageSource = () => {
    if (!exerciseData?.image) {
      return require("../../assets/images/browse/running-default.webp");
    }
    //console.log("Workout image: ", workoutData.image);
    // Add your image mappings here
    const imageMap: { [key: string]: any } = {
      "running-default.webp": require("../../assets/images/browse/running-default.webp"),
      // Add more mappings as needed
      // "other-image.webp": require("../assets/images/browse/other-image.webp"),
      "/exercises/barbell-squat.jpg": require("../../assets/images/exercises/barbell-squat.jpg"),
      "/exercises/bench-press.jpg": require("../../assets/images/exercises/bench-press.jpg"),
      "/exercises/deadlift.jpg": require("../../assets/images/exercises/deadlift.jpg"),
      "/exercises/dumbell-curls.jpg": require("../../assets/images/exercises/dumbell-curls.jpg"),
      "/exercises/hanging-leg-raise.jpg": require("../../assets/images/exercises/hanging-leg-raise.jpg"),
    };

    return (
      imageMap[exerciseData.image] ||
      require("../../assets/images/browse/running-default.webp")
    );
  };

  //fetch workout data from id
  const fetchCurrExerciseData = async (id: string) => {
    // Implementation to fetch workout data by id
    const res = await http.get(`/exercises/${id}`);
    console.log("This exercise data response: ", res);
    setExerciseData(res);
    //setWorkoutBlocksData(flatItems);
  };

  useEffect(() => {
    if (exerciseId) {
      fetchCurrExerciseData(exerciseId as string);
    }
  }, [exerciseId]);
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
            source={getImageSource()}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute w-full h-full bg-black opacity-40 z-10"></View>
          <View className="absolute bottom-4 mx-auto z-20 w-full px-4">
            <Text style={{ color: "white" }} className="font-bold text-4xl">
              {exerciseData?.title || "Exercise Title"}
            </Text>
            <Text style={{ color: "white" }} className="text-lg font-bold">
              Created by{" "}
              {exerciseData?.author
                ? exerciseData.author === "global"
                  ? "FitForge"
                  : exerciseData.author
                : "Unknown"}
            </Text>
            <View className="w-full flex flex-wrap gap-2 mt-2 flex-row">
              {exerciseData?.tags.map((tag, index) => (
                <Tags key={index} tag={tag} />
              ))}
            </View>
            {exerciseData?.description && (
              <>
                <Text
                  style={{ color: Colors[colorScheme].text }}
                  className="text-lg mt-4 font-bold"
                >
                  Description
                </Text>
                <Text
                  style={{ color: Colors[colorScheme].text }}
                  className="text-lg leading-tight"
                  numberOfLines={2}
                >
                  {exerciseData.description}
                </Text>
              </>
            )}
          </View>
        </View>
        <View className="w-full px-4 pt-4 mb-4">
          <Text className="text-lg font-bold text-white">Exercise Details</Text>
          <View className="w-full flex flex-wrap flex-row items-center gap-2">
            <View className="p-4 flex grow flex-col gap-0 rounded-2xl border border-neutral-200 bg-black ">
              <Text className="text-lg font-medium text-white">Sets</Text>
              <Text className="text-4xl font-semibold text-white">
                {exerciseData?.details.sets || 0}
              </Text>
            </View>
            <View className="p-4 flex grow flex-col gap-0 rounded-2xl border border-neutral-200 bg-black ">
              <Text className="text-lg font-medium text-white">Reps</Text>
              <Text className="text-4xl font-semibold text-white">
                {exerciseData?.details.reps || 0}
              </Text>
            </View>
            <View className="p-4 flex grow flex-col gap-0 rounded-2xl border border-neutral-200 bg-black ">
              <Text className="text-lg font-medium text-white">Rest Time</Text>
              <Text className="text-4xl font-semibold text-white">
                {exerciseData?.details.restSecs || 0}s
              </Text>
            </View>
          </View>
        </View>
        <View className="w-full px-4 pt-4 mb-4">
          <Text className="text-lg font-bold text-white mb-2">Equipment</Text>
          <FlatList
            data={exerciseData?.details.equipment || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View className="w-fit flex px-4 py-2 bg-black border border-neutral-200 rounded-lg mr-2">
                <Text className="text-white text-base capitalize">{item}</Text>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {exerciseData?.author !== "global" && (
          <View className="w-full px-4 pb-8">
            <TouchableOpacity className="w-full h-16 bg-black  my-2 rounded-2xl px-4 flex flex-row items-center justify-center">
              <Text className="text-white font-bold text-lg">
                Start Workout
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default ExercisePreview;

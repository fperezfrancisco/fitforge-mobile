import { Colors } from "@/constants/Colors";
import { WorkoutBlockItem, WorkoutType } from "@/types/workout";
import { http } from "@/utils/api";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
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

const WorkoutPreviewLi = ({ exercise }: { exercise: WorkoutBlockItem }) => {
  const colorScheme = useColorScheme() ?? "dark";
  return (
    <TouchableOpacity className="w-full rounded-2xl border border-neutral-200 p-2 px-4 bg-black/50 flex items-center h-[72px] justify-between flex-row">
      <View className="flex flex-row items-center gap-4">
        <View className="flex flex-col items-start">
          <Text
            style={{ color: Colors[colorScheme].text }}
            className="text-lg font-medium leading-tight"
          >
            {exercise.name}
          </Text>
          <View className="flex flex-row items-center gap-2">
            <Text
              style={{ color: Colors[colorScheme].text }}
              className="text-sm font-medium"
            >
              Sets {exercise.sets}
            </Text>
            <View className="h-full w-[1px] bg-neutral-200"></View>
            {exercise.reps && (
              <Text
                style={{ color: Colors[colorScheme].text }}
                className="text-sm font-medium"
              >
                Reps {exercise.reps}
              </Text>
            )}
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

  const { id } = useLocalSearchParams();
  //console.log(colorScheme);
  //const theme = Colors[colorScheme] ?? Colors.light;
  const [theme, setTheme] = useState(Colors[colorScheme] ?? Colors.light);
  const [workoutData, setWorkoutData] = useState<WorkoutType | null>(null);
  const [workoutBlocksData, setWorkoutBlocksData] = useState<
    WorkoutBlockItem[]
  >([]);

  const getImageSource = () => {
    if (!workoutData?.image) {
      return require("../../assets/images/browse/running-default.webp");
    }
    //console.log("Workout image: ", workoutData.image);
    // Add your image mappings here
    const imageMap: { [key: string]: any } = {
      "running-default.webp": require("../../assets/images/browse/running-default.webp"),
      // Add more mappings as needed
      // "other-image.webp": require("../assets/images/browse/other-image.webp"),
      "/workouts/pull.jpg": require("../../assets/images/workouts/pull.jpg"),
      "/workouts/push.jpg": require("../../assets/images/workouts/push.jpg"),
      "/workouts/legs.jpg": require("../../assets/images/workouts/legs.jpg"),
      "/workouts/full-a.jpg": require("../../assets/images/workouts/full-a.jpg"),
      "/workouts/full-b.jpg": require("../../assets/images/workouts/full-b.jpg"),
    };

    return (
      imageMap[workoutData.image] ||
      require("../../assets/images/browse/running-default.webp")
    );
  };

  //fetch workout data from id
  const fetchCurrWorkoutData = async (id: string) => {
    // Implementation to fetch workout data by id
    const res = await http.get(`/workouts/${id}`);
    console.log("This workout data response: ", res);
    setWorkoutData(res);
    //setWorkoutBlocksData(flatItems);
  };

  useEffect(() => {
    if (id) {
      fetchCurrWorkoutData(id as string);
    }
    if (workoutData) {
      const flatItems = (workoutData.blocks ?? []).flatMap(
        (b: any) => b.items ?? []
      );
      setWorkoutBlocksData(flatItems);
    }
  }, [id, workoutData]);

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
              {workoutData?.name || "Workout Title"}
            </Text>
            <Text style={{ color: "white" }} className="text-lg font-bold">
              Created by{" "}
              {workoutData?.author
                ? workoutData.author === "global"
                  ? "FitForge"
                  : workoutData.author
                : "Unknown"}
            </Text>
            <View className="w-full flex flex-wrap gap-2 mt-2 flex-row">
              {workoutData?.tags.map((tag, index) => (
                <Tags key={index} tag={tag} />
              ))}
            </View>
            {workoutData?.description && (
              <>
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
                  {workoutData.description}
                </Text>
              </>
            )}
          </View>
        </View>
        <View className="w-full px-4 pt-4 mb-4">
          <Text className="text-lg font-bold text-white">Exercise List</Text>
          <View className="flex flex-col items-start w-full gap-2 mt-2">
            {workoutBlocksData.map((exercise, index) => (
              <WorkoutPreviewLi key={index} exercise={exercise} />
            ))}
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

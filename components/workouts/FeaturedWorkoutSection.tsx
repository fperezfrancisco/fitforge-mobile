import { Colors } from "@/constants/Colors";
import { WorkoutType } from "@/types/workout";
import { http } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FlatList, Text, useColorScheme, View } from "react-native";
import LargeCard from "../LargeCard";

const FeaturedWorkoutSection = () => {
  const colorScheme = useColorScheme() ?? "dark";
  //console.log(colorScheme);
  const theme = Colors[colorScheme] ?? Colors.light;

  //import featured workouts data
  const [featuredList, setFeaturedList] = useState<WorkoutType[]>([]);

  // Fetch with React Query - cached by key, no refetch if fresh
  const { data: workoutData, isLoading } = useQuery({
    queryKey: ["workouts", "featured-pool"], // Unique key for this query
    queryFn: async () => {
      const res = await http.get("/workouts?scope=all&limit=50");
      console.log("Response: ", res.json());
      const data = await res.items;
      console.log("Data items: ", data.items);
      return data ?? []; // Return the array for caching
    },
  });

  const fetchWorkouts = async () => {
    const res = await http.get("/workouts?scope=all&limit=50");
    const data = await res.items;
    console.log("Res: ", data);
    return data ?? [];
  };

  useEffect(() => {
    if (workoutData) {
      console.log("data list: ", workoutData);
      // Filter and shuffle client-side from cached data
      const featuredPool = workoutData.filter((w: WorkoutType) =>
        (w.tags ?? []).includes("featured")
      );
      // Shuffle
      for (let i = featuredPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [featuredPool[i], featuredPool[j]] = [featuredPool[j], featuredPool[i]];
      }
      const featuredFive = featuredPool.slice(0, 5);
      setFeaturedList(featuredFive);
    } else {
      console.log("Didn't enter the workoutData conditional: ", workoutData);
      const setUpFeatured = async () => {
        const workoutList = await fetchWorkouts();
        const featuredPool = workoutList.filter((w: WorkoutType) =>
          (w.tags ?? []).includes("featured")
        );
        // Shuffle
        for (let i = featuredPool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [featuredPool[i], featuredPool[j]] = [
            featuredPool[j],
            featuredPool[i],
          ];
        }
        const featuredFive = featuredPool.slice(0, 5);
        setFeaturedList(featuredFive);
      };
      setUpFeatured();
    }
  }, [workoutData]);

  return (
    <View className="w-full flex flex-col items-start gap-2 mb-4">
      <Text style={{ color: theme.text }} className="font-semibold text-2xl">
        Featured Workouts
      </Text>
      {isLoading && <Text>Loading...</Text>}
      {!isLoading && featuredList.length <= 0 ? (
        <Text className="text-lime-500 text-2xl">
          No featured workouts available.
        </Text>
      ) : (
        <FlatList
          horizontal={true}
          data={featuredList}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="w-4" />}
          className="space-x-4 h-[200px]"
          renderItem={({ item, index }) => (
            <LargeCard key={index} workout={item} />
          )}
        />
      )}
    </View>
  );
};

export default FeaturedWorkoutSection;

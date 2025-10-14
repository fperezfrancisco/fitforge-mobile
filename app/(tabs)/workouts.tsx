import LargeCard from "@/components/LargeCard";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import SmallCard from "@/components/SmallCard";
import { Colors } from "@/constants/Colors";
import { workoutGrid } from "@/constants/workouts";
import { Stack } from "expo-router";
import React from "react";
import { FlatList, ScrollView, Text, useColorScheme, View } from "react-native";

const Workouts = () => {
  const colorScheme = useColorScheme() ?? "dark";
  //console.log(colorScheme);
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Workouts",

          header: () => <PageHeader title="Workouts" />,
        }}
      />
      <View
        style={{
          backgroundColor: theme.background,
        }}
        className="flex-1 items-center justify-center w-screen h-screen"
      >
        <ScrollView
          className="w-fullflex flex-col"
          contentContainerStyle={{
            width: "100%",
            flexGrow: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 16,
          }}
        >
          <View className="w-full flex flex-row items-center justify-between mb-4">
            <Text
              style={{ color: theme.text }}
              className="text-medium text-base"
            >
              Thursday
            </Text>
            <Text
              style={{ color: theme.text }}
              className="text-medium text-base"
            >
              Aug 28, 2025
            </Text>
          </View>
          <View className="w-full flex flex-col items-start gap-2 mb-4">
            <Text
              style={{ color: theme.text }}
              className="font-semibold text-2xl"
            >
              Featured Workouts
            </Text>
            <FlatList
              horizontal={true}
              data={[1, 2, 3, 4, 5]}
              keyExtractor={(item) => item.toString()}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="w-4" />}
              className="space-x-4 h-[200px]"
              renderItem={({ item, index }) => <LargeCard key={index} />}
            />
          </View>
          <SearchBar
            placeholder="Search Workouts"
            onPress={() => console.log("Search Pressed")}
          />
          <View className="w-full mb-4" style={{ gap: 8 }}>
            {workoutGrid
              .reduce((rows, item, index) => {
                if (index % 2 === 0) {
                  rows.push([item]);
                } else {
                  rows[rows.length - 1].push(item);
                }
                return rows;
              }, [] as any[][])
              .map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  className="w-full flex-row"
                  style={{ gap: 8 }}
                >
                  {row.map((item, itemIndex) => (
                    <View key={item.id || itemIndex} className="flex-1">
                      <SmallCard title={item.title} imgUrl={item.imgUrl} />
                    </View>
                  ))}
                  {row.length === 1 && <View className="flex-1" />}
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Workouts;

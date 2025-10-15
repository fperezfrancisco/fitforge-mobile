import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const MINI_PLAYER_HEIGHT = 64;
const BOTTOM_TAB_HEIGHT = 80; // Adjust based on your tab bar height

const WorkoutPreviewLi = () => {
  const colorScheme = useColorScheme() ?? "dark";
  const [isChecked, setChecked] = useState(false);
  return (
    <TouchableOpacity className="w-full rounded-2xl border border-neutral-200 p-2 px-4 bg-black/50 flex items-center h-[72px] justify-between flex-row">
      <View className="flex flex-row items-center gap-4">
        <Checkbox
          style={{ borderColor: "white", width: 32, height: 32 }}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#65A30D" : undefined}
        />
        <View className="flex flex-col items-start">
          <Text
            style={{ color: Colors[colorScheme].text }}
            className={`${isChecked ? "line-through" : ""} text-lg font-medium leading-tight`}
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
        source={require("../assets/icons/chevron-right.png")}
      />
    </TouchableOpacity>
  );
};

interface WorkoutPlayerProps {
  isVisible?: boolean;
  onClose?: () => void;
}

const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({
  isVisible = false,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colorScheme = useColorScheme() ?? "dark";

  //console.log(colorScheme);
  //const theme = Colors[colorScheme] ?? Colors.light;
  const [theme, setTheme] = useState(Colors[colorScheme] ?? Colors.light);

  const expandPlayer = () => {
    setIsExpanded(true);
  };

  const collapsePlayer = () => {
    setIsExpanded(false);
  };

  const handleClose = () => {
    onClose?.();
  };

  if (!isVisible) return null;

  const MiniPlayer = () => (
    <View
      className="absolute bottom-4 left-0 right-0 w-full"
      style={{
        height: MINI_PLAYER_HEIGHT,
        marginBottom: BOTTOM_TAB_HEIGHT,
        zIndex: 1000,
      }}
    >
      <TouchableOpacity
        onPress={expandPlayer}
        className="flex-1"
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View className="flex-1 flex-row items-center justify-between px-4 bg-lime-600">
          <View className="flex-row items-center flex-1 py-2 gap-4">
            <View className="aspect-square w-auto h-full bg-neutral-200 rounded-lg mr-3">
              {/* Workout thumbnail/image placeholder */}
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-sm">
                Workout Title
              </Text>
              <Text className="text-white text-xs">00:00:00</Text>
            </View>
          </View>
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity>
              <Ionicons name="play" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const FullPlayer = () => (
    <Modal
      visible={isExpanded}
      animationType="slide"
      presentationStyle="fullScreen"
      style={{
        height: "100%",
      }}
    >
      <ScrollView
        style={{
          backgroundColor: "#65A30D",
          paddingTop: 36,
        }}
        className="flex-1 w-full"
      >
        <StatusBar />

        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3">
          <TouchableOpacity onPress={collapsePlayer}>
            <Ionicons name="chevron-down" size={28} color="white" />
          </TouchableOpacity>
          <Text
            style={{ color: theme.text }}
            className=" font-semibold text-lg"
          >
            Now Playing
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Main Content Area */}
        <View className="flex-1 px-6 py-8 w-full">
          {/* Workout Image/Video Area */}
          <View className="aspect-square bg-neutral-200 rounded-2xl mb-4 w-full h-auto"></View>

          {/* Workout Info */}
          <View className="mb-4">
            <Text
              style={{ color: theme.text }}
              className="font-bold text-2xl mb-2"
            >
              Workout Title
            </Text>
            <Text style={{ color: theme.text }} className="text-lg">
              Current Exercise Name
            </Text>
          </View>
          <View className="w-full mb-8 flex flex-col items-center gap-2">
            <View className="flex flex-row items-center">
              <Text
                style={{ color: theme.text }}
                className="text-4xl font-medium"
              >
                00:00:24
              </Text>
            </View>
            <View className="w-full flex flex-row items-center gap-4">
              <TouchableOpacity className="bg-black text-white px-4 h-[48px] flex items-center justify-center w-1/2 rounded-lg">
                <Text className="text-white font-medium">Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ backgroundColor: "red" }}
                className=" text-white px-4 h-[48px] flex items-center justify-center w-1/2 rounded-lg"
              >
                <Text className="text-white font-medium">End Workout</Text>
              </TouchableOpacity>
            </View>
            <View className="w-full flex flex-col items-start mt-8">
              <Text
                style={{ color: theme.text }}
                className="text-lg font-medium"
              >
                Exercise List
              </Text>
              <View className="mt-4 flex flex-col items-start gap-2 w-full">
                <WorkoutPreviewLi />
                <WorkoutPreviewLi />
                <WorkoutPreviewLi />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );

  return (
    <>
      <MiniPlayer />
      <FullPlayer />
    </>
  );
};

export default WorkoutPlayer;

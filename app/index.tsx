import { Colors } from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Checkbox } from "expo-checkbox";
import { Link, useRouter } from "expo-router";

import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

const LoginForm = () => {
  const colorScheme = useColorScheme() ?? "dark";
  //console.log(colorScheme);
  //const theme = Colors[colorScheme] ?? Colors.light;
  //console.log(Colors[colorScheme]);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    // Handle form submission logic here
    router.push("/(tabs)/workouts");
  };

  return (
    <View className="w-full flex flex-col items-center mt-8">
      <View className="w-full h-16 mb-4 flex flex-row items-center relative">
        <MaterialIcons
          name="email"
          size={24}
          color={`${colorScheme === "light" ? "black" : "white"}`}
          className="absolute left-4 top-3"
        />
        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            color: colorScheme === "light" ? "black" : "white",
            backgroundColor: "transparent",
          }}
          className="w-full px-4 pl-14 py-3 rounded-2xl border border-neutral-200 mb-4 text-base h-16 relative flex flex-row gap-4"
        />
      </View>
      <View className="w-full h-16 mb-4 flex flex-row items-center relative">
        <Entypo
          name="lock"
          size={24}
          color={`${colorScheme === "light" ? "black" : "white"}`}
          className="absolute left-4 top-3"
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            color: colorScheme === "light" ? "black" : "white",
            backgroundColor: "transparent",
          }}
          className="w-full px-4 pl-14 py-3 rounded-2xl border border-neutral-200 mb-4 text-base h-16 relative flex flex-row gap-4"
        />
      </View>
      <View className="w-full mb-8 flex flex-row items-center justify-between">
        <View className="w-fit flex flex-row items-center">
          <Checkbox
            value={rememberMe}
            onValueChange={setRememberMe}
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
            }}
          />
          <Text
            style={{ color: colorScheme === "light" ? "black" : "white" }}
            className="text-sm ml-2"
          >
            Remember Me?
          </Text>
        </View>
        <Link href="/" asChild>
          <Text
            style={{ color: colorScheme === "light" ? "black" : "white" }}
            className="text-sm  underline"
          >
            Forgot Password?
          </Text>
        </Link>
      </View>
      <View className="w-full flex flex-row items-center">
        <TouchableOpacity
          onPress={handleSubmit}
          className="w-full bg-lime-600 h-[80px] rounded-full py-4 items-center justify-center"
        >
          <Text className="text-white font-bold text-2xl">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SignUpForm = () => {
  const colorScheme = useColorScheme() ?? "dark";

  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    // Handle form submission logic here
    router.push("/(tabs)/workouts");
  };
  return (
    <View className="w-full flex flex-col items-center mt-8">
      <View className="w-full h-16 mb-4 flex flex-row items-center relative">
        <FontAwesome5
          name="user-alt"
          size={24}
          color={`${colorScheme === "light" ? "black" : "white"}`}
          className="absolute left-4 top-3"
        />
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            color: colorScheme === "light" ? "black" : "white",
            backgroundColor: "transparent",
          }}
          className="w-full px-4 pl-14 py-3 rounded-2xl border border-neutral-200 mb-4 text-base h-16 relative flex flex-row gap-4"
        />
      </View>
      <View className="w-full h-16 mb-4 flex flex-row items-center relative">
        <MaterialIcons
          name="email"
          size={24}
          color={`${colorScheme === "light" ? "black" : "white"}`}
          className="absolute left-4 top-3"
        />
        <TextInput
          keyboardType="email-address"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            color: colorScheme === "light" ? "black" : "white",
            backgroundColor: "transparent",
          }}
          className="w-full px-4 pl-14 py-3 rounded-2xl border border-neutral-200 mb-4 text-base h-16 relative flex flex-row gap-4"
        />
      </View>
      <View className="w-full h-16 mb-4 flex flex-row items-center relative">
        <Entypo
          name="lock"
          size={24}
          color={`${colorScheme === "light" ? "black" : "white"}`}
          className="absolute left-4 top-3"
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            color: colorScheme === "light" ? "black" : "white",
            backgroundColor: "transparent",
          }}
          className="w-full px-4 pl-14 py-3 rounded-2xl border border-neutral-200 mb-4 text-base h-16 relative flex flex-row gap-4"
        />
      </View>
      <View className="w-full h-16 mb-4 flex flex-row items-center relative">
        <Entypo
          name="lock"
          size={24}
          color={`${colorScheme === "light" ? "black" : "white"}`}
          className="absolute left-4 top-3"
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            color: colorScheme === "light" ? "black" : "white",
            backgroundColor: "transparent",
          }}
          className="w-full px-4 pl-14 py-3 rounded-2xl border border-neutral-200 mb-4 text-base h-16 relative flex flex-row gap-4"
        />
      </View>
      <View className="w-full mb-8 flex flex-row items-center justify-between">
        <View className="w-fit flex flex-row items-center">
          <Checkbox
            value={rememberMe}
            onValueChange={setRememberMe}
            style={{
              width: 20,
              height: 20,
              borderRadius: 6,
            }}
          />
          <Text
            style={{ color: colorScheme === "light" ? "black" : "white" }}
            className="text-sm ml-2"
          >
            Remember Me?
          </Text>
        </View>
      </View>
      <View className="w-full flex flex-row items-center">
        <TouchableOpacity
          onPress={handleSubmit}
          className="w-full bg-lime-600 h-[80px] rounded-full py-4 items-center justify-center"
        >
          <Text className="text-white font-bold text-2xl">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Index() {
  const colorScheme = useColorScheme() ?? "dark";
  //console.log(colorScheme);
  const theme = Colors[colorScheme] ?? Colors.light;
  //console.log(Colors[colorScheme]);

  const [isLogin, setIsLogin] = useState(true);

  return (
    <View
      style={{
        backgroundColor: theme.background,
      }}
      className="flex-1 items-center justify-center w-screen h-screen"
    >
      <ScrollView
        className="w-full h-full flex flex-col"
        contentContainerStyle={{
          width: "100%",
          flexGrow: 1,
          marginTop: 120,
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 32,
        }}
      >
        <View className="w-full px-4 flex flex-col items-center">
          <Text
            style={{ color: theme.text }}
            className="text-4xl sm:text-5xl font-bold"
          >
            Welcome {isLogin ? "Back" : "to FitForge"}
          </Text>
          <Text
            style={{ color: theme.text }}
            className="text-base text-center mt-4 leading-tight px-4"
          >
            {isLogin
              ? "Let's keep crushing your fitness goals!"
              : "Your journey to a healthier, stronger you starts here."}
          </Text>
        </View>
        <View
          className={`w-full mt-8 flex-row h-[86px] ${colorScheme === "light" ? "bg-lime-900" : "bg-lime-950/50"} rounded-full p-3`}
        >
          <TouchableOpacity
            onPress={() => setIsLogin(true)}
            className={`flex-1 w-1/2
              ${isLogin ? "bg-lime-600" : "bg-transparent"}
             rounded-full items-center justify-center`}
          >
            <Text className="text-white font-semibold text-lg">Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsLogin(false)}
            className={`flex-1 w-1/2 ${isLogin ? "bg-transparent" : "bg-lime-600"} rounded-full items-center justify-center`}
          >
            <Text className="text-white font-semibold text-lg">Sign up</Text>
          </TouchableOpacity>
        </View>
        {isLogin ? <LoginForm /> : <SignUpForm />}
      </ScrollView>
    </View>
  );
}

import { AuthProvider } from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout() {
  //const colorScheme = useColorScheme();
  //const theme = Colors[colorScheme ?? "light"] ?? Colors.light;
  //const { isAuthenticated } = useContext(AuthContext)!;

  return (
    <>
      <StatusBar hidden={true} />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

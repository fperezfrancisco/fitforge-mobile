import { Colors } from "@/constants/Colors";
import { Image, TextInput, useColorScheme, View } from "react-native";

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ value, placeholder, onPress, onChangeText }: Props) => {
  const colorScheme = useColorScheme() ?? "dark";
  //console.log(colorScheme);
  const theme = Colors[colorScheme] ?? Colors.light;
  return (
    <View className="flex-row items-center border border-neutral-200 rounded-2xl px-4 py-4 mb-4">
      <Image
        source={require("../assets/icons/search.png")}
        className="size-5"
        resizeMode="contain"
        tintColor={theme.text}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={theme.text}
        style={{ color: theme.text }}
        className="flex-1 ml-2"
      />
    </View>
  );
};

export default SearchBar;

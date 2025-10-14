import React from "react";
import { Image, Text, View } from "react-native";

const SmallCard = ({ title, subtitle, imgUrl, action }: any) => {
  return (
    <View className="aspect-[3/2] w-full border border-neutral-200 rounded-2xl bg-lime-600 relative">
      <View className="absolute w-full h-full bg-black opacity-50 rounded-2xl z-10"></View>
      <>
        {imgUrl && (
          <Image
            source={imgUrl}
            className="absolute w-full h-full rounded-2xl z-5"
            resizeMode="cover"
          />
        )}
      </>

      <View className="absolute bottom-4 left-4 z-20">
        <Text
          style={{ color: "white" }}
          className="font-bold text-lg leading-tight"
        >
          {title ?? "Workout Title"}
        </Text>
        {subtitle && (
          <Text style={{ color: "white" }} className="text-sm">
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
};

export default SmallCard;

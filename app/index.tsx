
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { fetchInFridgeItems } from "../api/firestore";
import FoodItem from "../models/FoodItem";

const screenHeight = Dimensions.get("window").height;

const fetchDataFromDatabase = (count = 8) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const generatedData = Array.from({ length: count }, (_, index) => ({
        id: `index${index + 1}`,
        label: `Index ${index + 1}`,
        imageUrl: require('./pictures/apple.jpg') // 使用 require 加載本地圖片
      }));
      const dataWithMain = [{ id: 'main', label: 'Main', imageUrl: require('./pictures/apple.jpg') }, ...generatedData];
      resolve(dataWithMain);
    }, 1000);
  });
};

const Index = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    const loadFoodItems = async () => {
      const items = await fetchInFridgeItems();
      setFoodItems(items);
    };

    loadFoodItems();
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handlePress = (item) => {
    navigation.navigate('DynamicPage', { label: item.label, imageUrl: item.imageUrl });
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [
      ((index - 1) * screenHeight) / 4,
      (index * screenHeight) / 4,
      ((index + 1) * screenHeight) / 4,
    ];
  
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1.2, 0.8],
      extrapolate: "clamp",
    });
  
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: "clamp",
    });

    const backgroundColor = scrollY.interpolate({
      inputRange: [
        ((index - 1) * screenHeight) / 4 - screenHeight / 4,
        (index * screenHeight) / 4 - screenHeight / 8,
        (index * screenHeight) / 4 + screenHeight / 8,
        ((index + 1) * screenHeight) / 4 + screenHeight / 4,
      ],
      outputRange: [
        item.id === "main" ? "#FFFFE0" : "#D0D0D0",
        item.id === "main" ? "#FFFFE0" : "#D0D0D0",
        "#FFFFE0",
        "#D0D0D0",
      ],
      extrapolate: "clamp",
    });

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            height: screenHeight / 4,
            transform: [{ scale }],
            opacity,
            backgroundColor,
          },
        ]}
      >
        <TouchableOpacity onPress={() => handlePress(item)} style={styles.touchableArea}>
          <View style={styles.imageContainer}>
            <Image
              source={item.imageUrl} // Local Picture
              style={styles.image}
            />
          </View>
          <View
            style={[
              styles.textBox,
              item.id === "main" ? styles.mainTextBox : styles.indexTextBox,
            ]}
          >
            <Text style={styles.text}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  

  return (
    <Animated.FlatList
      data={foodItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.doc_id}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingBottom: screenHeight / 4 }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  imageContainer: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    width: "25%",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
  mainTextBox: {
    backgroundColor: "#FFFFE0",
    marginLeft: "12.5%",
  },
  indexTextBox: {
    backgroundColor: "#D0D0D0",
    marginLeft: "12.5%",
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    textAlign: "center",
    color: "#000000",
  },
  touchableArea: {
    flexDirection: "row",
    flex: 1,
  },
});

export default Index;
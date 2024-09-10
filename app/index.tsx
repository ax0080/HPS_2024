import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { fetchInFridgeItems } from "../api/firestore";
import FoodItem from "../models/FoodItem";

const screenHeight = Dimensions.get("window").height;

const Index = () => {
  const navigation = useNavigation();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<string>("Loading data...");
  const flatListRef = useRef<FlatList<FoodItem>>(null);

  useEffect(() => {
    loadFoodItems();
    // 每分钟检查一次食品到期情况
    const interval = setInterval(() => {
      checkExpirationDates();
    }, 60000); // 每60秒执行一次

    return () => clearInterval(interval); // 组件卸载时清除定时器
  }, []);

  useEffect(() => {
    // 在数据加载完成后，稍微延迟一下再触发滚动
    if (!isRefreshing && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 300); // 延迟300ms
    }
  }, [foodItems, isRefreshing]);

  const loadFoodItems = async () => {
    setIsRefreshing(true);
    setLoadingStatus("Loading data...");
    try {
      const items = await fetchInFridgeItems();
      // 排序：过期日越短的排在上面
      items.sort((a, b) => new Date(a.expiration_date) - new Date(b.expiration_date));
      setFoodItems(items);
      setLoadingStatus("");
      checkExpirationDates(); // 在加载完成后检查过期情况
    } catch (error) {
      setLoadingStatus(`Error fetching data: ${error.message}`);
    } finally {
      setIsRefreshing(false);
    }
  };

  const checkExpirationDates = () => {
    const now = new Date();
    const threeDaysLater = new Date(now);
    threeDaysLater.setDate(now.getDate() + 3);

    const expiringSoon = foodItems.some((item) => {
      const expirationDate = new Date(item.expiration_date);
      return expirationDate <= threeDaysLater;
    });

    if (expiringSoon) {
      navigation.navigate('AlertPage'); // 跳转到通知页面
    }
  };

  const getBackgroundColor = (expirationDate) => {
    const now = new Date();
    const expiryDate = new Date(expirationDate);
    const threeDaysLater = new Date(now);
    threeDaysLater.setDate(now.getDate() + 3);

    if (expiryDate < now) {
      return '#FFDDDD'; // 淡红色表示已过期
    } else if (expiryDate <= threeDaysLater) {
      return '#FFFFDD'; // 淡黄色表示三天内过期
    } else {
      return '#DDFFDD'; // 淡绿色表示三天后过期
    }
  };

  const handlePress = (item) => {
    navigation.navigate('DynamicPage', { 
      name: item.name, 
      category: item.category, 
      expiration_date: item.expiration_date, 
      imageUrl: item.image_url 
    });
  };

  const handleRefresh = () => {
    if (!isRefreshing) {
      loadFoodItems();
    }
  };

  const renderItem = ({ item }) => {
    if (!item || !item.image_url || !item.name || !item.expiration_date) {
      return null;
    }

    return (
      <View style={[styles.itemContainer, { backgroundColor: getBackgroundColor(item.expiration_date) }]}>
        <TouchableOpacity onPress={() => handlePress(item)} style={styles.touchableArea}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.image_url }}
              style={styles.image}
            />
          </View>
          <View
            style={[
              styles.textBox,
              item.id === "main" ? styles.mainTextBox : styles.indexTextBox,
            ]}
          >
            <Text style={styles.text}>Name: {item.name}</Text>
            <Text style={styles.text}>Category: {item.category}</Text>
            <Text style={styles.text}>Expiration Date: {item.expiration_date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.doc_id}
        onRefresh={handleRefresh}
        refreshing={isRefreshing}
        ListHeaderComponent={isRefreshing ? <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    height: screenHeight / 5,
  },
  imageContainer: {
    width: "35%",
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    width: "55%",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  mainTextBox: {
    backgroundColor: "#D9D9D9",
    marginLeft: "5%",
  },
  indexTextBox: {
    backgroundColor: "#D9D9D9",
    marginLeft: "5%",
  },
  image: {
    width: "80%",
    height: "80%",
  },
  text: {
    textAlign: "left",
    color: "#000000",
    fontSize: 12,
    fontFamily: 'Arial',
  },
  touchableArea: {
    flexDirection: "row",
    flex: 1,
  },
  spinner: {
    marginVertical: 10,
  },
});

export default Index;

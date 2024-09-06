import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';

// 设置屏幕高度
const screenHeight = Dimensions.get('window').height;

const DynamicPage = () => {
  const route = useRoute();
  const { label, imageUrl } = route.params || {}; // 防范未定义错误

  // 确保 imageUrl 是字符串
  const imageUrlString = typeof imageUrl === 'string' ? imageUrl : '';

  // 根据 imageUrl 是否为本地图片来确定 source
  const imageSource = imageUrlString.startsWith('http')
    ? { uri: imageUrlString }
    : require('./pictures/apple.jpg'); // 使用本地图片作为默认

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={imageSource}
          style={styles.largeImage}
        />
        <View style={styles.textBox}>
          <Text style={styles.text}>{label}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  largeImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  textBox: {
    width: '100%',
    height: '50%',
    backgroundColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#000000',
  },
});

export default DynamicPage;

import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

const Index1Page = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('./pictures/apple.jpg')}
          style={styles.largeImage}
        />
        <View style={styles.textBox}>
          <Text style={styles.text}>Index 1</Text>
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
    height: '50%', // 使圖片佔屏幕的一半高度
    resizeMode: 'cover', // 確保圖片按比例放大
  },
  textBox: {
    width: '100%',
    height: '50%', // 使文字方塊佔屏幕的一半高度
    backgroundColor: '#D0D0D0', // 淺灰色背景
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#000000',
  },
});

export default Index1Page;

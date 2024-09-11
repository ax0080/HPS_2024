import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Image, View, StyleSheet } from 'react-native';
import AlertPage from './AlertPage'; 
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions'; // 用于请求权限

const BACKGROUND_FETCH_TASK = 'background-fetch-task';

// 定义后台任务
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    // 在后台任务中进行数据加载和检查
    const items = await fetchInFridgeItems();
    items.forEach(item => {
      const expirationDate = new Date(item.expiration_date);
      const now = new Date();
      
      // 检查是否已经过期
      if (expirationDate <= now) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Food item has expired!',
            body: `${item.name} expired on ${item.expiration_date}`,
            data: { item },
          },
          trigger: null, // 立即触发
        });
      }
    });
  } catch (error) {
    console.error('Error in background task:', error);
  }
});

export default function RootLayout() {
  useEffect(() => {
    const requestPermissions = async () => {
      // 获取当前权限状态
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // 如果权限尚未被请求，则请求权限
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // 如果权限被拒绝，显示警告信息
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }

      // 获取 Expo 推送令牌
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log('Expo push token:', token);

      // 注册后台任务
      await TaskManager.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 10, // 每10秒执行一次，调试时可以设置得更短
      });
    };

    requestPermissions();
  }, []);

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Main Page',
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Image 
                source={require('./pictures/LOGO.png')} 
                style={styles.logo} 
              />
            </View>
          )
        }} 
      />
      <Stack.Screen name="DynamicPage" options={{ title: '  ' }} />
      <Stack.Screen name="AlertPage" component={AlertPage} options={{ headerShown: false }} /> 
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 200, // 根据需要调整 logo 的宽度
    height: 40, // 根据需要调整 logo 的高度
  },
});

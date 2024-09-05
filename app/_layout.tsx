import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* 主頁的標題修改為 "Main Page" */}
      <Stack.Screen name="index" options={{ title: 'Main Page' }} />
      {/* 其他页面 */}
      <Stack.Screen name="Index1Page" options={{ title: 'Index 1 頁面' }} />
      <Stack.Screen name="Index2Page" options={{ title: 'Index 2 頁面' }} />
      <Stack.Screen name="Index3Page" options={{ title: 'Index 3 頁面' }} />
      <Stack.Screen name="Index4Page" options={{ title: 'Index 4 頁面' }} />
      <Stack.Screen name="Index5Page" options={{ title: 'Index 5 頁面' }} />
      <Stack.Screen name="Index6Page" options={{ title: 'Index 6 頁面' }} />
      <Stack.Screen name="Index7Page" options={{ title: 'Index 7 頁面' }} />
    </Stack>
  );
}


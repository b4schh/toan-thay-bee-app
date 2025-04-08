import { Stack } from 'expo-router';

export default function ExamLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ẩn header nếu không cần
      }}
    >
      <Stack.Screen name="do-exam" />
      <Stack.Screen name="result" />
    </Stack>
  );
}
import { Stack } from "expo-router";

export default function ClassroomLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]/index" />
      <Stack.Screen name="[id]/detail" />
      <Stack.Screen name="[id]/[lessonId]" />
    </Stack>
  );
}

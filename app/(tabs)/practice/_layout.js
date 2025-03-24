import { Stack } from "expo-router";

export default function PraticeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index"/>
      <Stack.Screen name="[id]/index"/>
    </Stack>
  );
}

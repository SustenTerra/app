import { StatusBar } from 'expo-status-bar';

import { Slot } from 'expo-router';

export default function Layout() {
  return (
    <>
      <StatusBar style="auto" />
      <Slot />
    </>
  );
}

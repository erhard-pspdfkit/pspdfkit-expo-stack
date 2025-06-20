import { ClassicStack as Stack } from '@/components/ClassicStack';
import HeaderSearchBar from '@/components/HeaderSearchBar';
import { DarkTheme, DefaultTheme, ThemeProvider, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  // This function determines the header title based on the active tab route
  const getHeaderTitle = (route: any) => {
    // If the focused route is not found, we default to the 'index' screen
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'index';
  
    switch (routeName) {
      case 'index':
        return 'Home';
      case 'explore':
        return 'Explore';
      default:
        return 'Home';
    }
  };

  const handleSearchTextChange = (text: string) => {
    console.log('Search text changed:', text);
  };

  const handleSearchSubmit = (text: string) => {
    console.log('Search submitted:', text);
  };

  const handleSearchCancel = () => {
    console.log('Search cancelled');
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="(tabs)"
          options={({ route }) => ({
            headerShown: true,
            headerTitle: isSearchExpanded ? '' : getHeaderTitle(route),
            headerRight: () => (
              <HeaderSearchBar
                placeholder="Search..."
                onChangeText={handleSearchTextChange}
                onSubmitEditing={handleSearchSubmit}
                onSearchButtonPress={handleSearchSubmit}
                onCancelButtonPress={handleSearchCancel}
                onExpansionChange={setIsSearchExpanded}
                tintColor="#8e8e93"
              />
            ),
          })}
        />
        <Stack.Screen 
          name="pdf-viewer" 
          options={{ 
            headerShown: false
          }} 
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

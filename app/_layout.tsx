// import { ClassicStack as Stack } from '@/components/ClassicStack';
import { DarkTheme, DefaultTheme, ThemeProvider, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

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

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="(tabs)"
          options={({ route }) => ({
            headerShown: true,
            headerTitle: getHeaderTitle(route),
            headerSearchBarOptions: {
              placeholder: 'Search...',
              onChangeText: (event: any) => handleSearchTextChange(event.nativeEvent.text),
              onSearchButtonPress: (event: any) => handleSearchSubmit(event.nativeEvent.text),
            },
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

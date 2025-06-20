import { createStackNavigator } from '@react-navigation/stack';
import { withLayoutContext } from 'expo-router/build/layouts/withLayoutContext';

const BaseStack = createStackNavigator();

// A drop-in replacement for `import { Stack } from "expo-router"` that uses
// the classic JS-based Stack Navigator instead of the native-stack.
export const ClassicStack = withLayoutContext(BaseStack.Navigator);
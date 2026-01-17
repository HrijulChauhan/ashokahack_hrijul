import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { FavoritesProvider } from './src/context/FavoritesContext';

import { HomeScreen, RestaurantDetailScreen, ReservationScreen } from './src/screens';
import { COLORS } from './src/constants/theme';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Gargoyle': require('./src/fonts/gargoyle/OPTIGargoyle-Normal.otf'),
    'Gargoyle-Italic': require('./src/fonts/gargoyle/OPTIGargoyle-Italic.otf'),
    'Saans': require('./src/fonts/saans/Saans-TRIAL-Regular.otf'),
    'Saans-Bold': require('./src/fonts/saans/Saans-TRIAL-Bold.otf'),
    'Saans-Medium': require('./src/fonts/saans/Saans-TRIAL-Medium.otf'),
    'Saans-SemiBold': require('./src/fonts/saans/Saans-TRIAL-SemiBold.otf'),
    'Saans-Light': require('./src/fonts/saans/Saans-TRIAL-Light.otf'),
  });

  React.useEffect(() => {
    if (fontError) {
      console.error('Error loading fonts:', fontError);
    }
  }, [fontError]);

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <FavoritesProvider>
      <SafeAreaProvider onLayout={onLayoutRootView}>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: COLORS.background },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />
            <Stack.Screen
              name="RestaurantDetail"
              component={RestaurantDetailScreen}
            />
            <Stack.Screen
              name="Reservation"
              component={ReservationScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </FavoritesProvider>
  );
}

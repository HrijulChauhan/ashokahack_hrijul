import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RoleSelectScreen from './screens/RoleSelectScreen';
import StudentHomeScreen from './screens/StudentHomeScreen';
import BagDetailScreen from './screens/BagDetailScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('RoleSelect');
  const [selectedBag, setSelectedBag] = useState(null);

  // Manual navigation function
  const navigate = (screen, params = {}) => {
    if (params.bag) setSelectedBag(params.bag);
    setCurrentScreen(screen);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {currentScreen === 'RoleSelect' && (
          <RoleSelectScreen navigation={{ navigate }} />
        )}
        {currentScreen === 'StudentHome' && (
          <StudentHomeScreen navigation={{ navigate }} />
        )}
        {currentScreen === 'BagDetail' && (
          <BagDetailScreen 
            route={{ params: { bag: selectedBag } }} 
            navigation={{ navigate, goBack: () => setCurrentScreen('StudentHome') }} 
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

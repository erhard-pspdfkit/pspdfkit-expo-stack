import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface HeaderSearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (text: string) => void;
  onSearchButtonPress?: (text: string) => void;
  onCancelButtonPress?: () => void;
  onExpansionChange?: (isExpanded: boolean) => void;
  barTintColor?: string;
  tintColor?: string;
  textColor?: string;
  automaticallyShowsCancelButton?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export default function HeaderSearchBar({
  placeholder = 'Search',
  onChangeText,
  onSubmitEditing,
  onSearchButtonPress,
  onCancelButtonPress,
  onExpansionChange,
  barTintColor = '#f2f2f2',
  tintColor = '#007AFF',
  textColor = '#000',
  automaticallyShowsCancelButton = true,
}: HeaderSearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showCancelButton, setShowCancelButton] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  const expandAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const expandSearch = () => {
    setIsExpanded(true);
    onExpansionChange?.(true);
    setShowCancelButton(automaticallyShowsCancelButton);
    
    Animated.parallel([
      Animated.timing(expandAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      inputRef.current?.focus();
    });
  };

  const collapseSearch = () => {
    onExpansionChange?.(false);
    setSearchText('');
    setShowCancelButton(false);
    onChangeText?.('');
    
    Animated.parallel([
      Animated.timing(expandAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setIsExpanded(false);
      onCancelButtonPress?.();
    });
  };

  const handleTextChange = (text: string) => {
    setSearchText(text);
    onChangeText?.(text);
    
    if (automaticallyShowsCancelButton) {
      setShowCancelButton(text.length > 0);
    }
  };

  const handleSubmit = () => {
    onSubmitEditing?.(searchText);
    onSearchButtonPress?.(searchText);
  };

  const searchBarWidth = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [40, screenWidth - 120], // Adjust based on your header layout
  });

  if (!isExpanded) {
    return (
      <TouchableOpacity
        style={[styles.searchIconContainer, { backgroundColor: barTintColor }]}
        onPress={expandSearch}
        activeOpacity={0.7}
      >
        <Ionicons name="search" size={20} color={tintColor} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.searchBarContainer,
          {
            width: searchBarWidth,
            backgroundColor: barTintColor,
            opacity: opacityAnim,
          },
        ]}
      >
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={16} color={tintColor} style={styles.searchIcon} />
          <TextInput
            ref={inputRef}
            style={[styles.searchInput, { color: textColor }]}
            placeholder={placeholder}
            placeholderTextColor="#8e8e93"
            value={searchText}
            onChangeText={handleTextChange}
            onSubmitEditing={handleSubmit}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
        </View>
      </Animated.View>
      
      {showCancelButton && (
        <Animated.View style={{ opacity: opacityAnim }}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={collapseSearch}
            activeOpacity={0.7}
          >
            <Text style={[styles.cancelText, { color: tintColor }]}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  searchIconContainer: {
    width: 40,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  searchBarContainer: {
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    marginRight: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    flex: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    ...Platform.select({
      ios: {
        paddingVertical: 0,
      },
      android: {
        paddingVertical: 0,
      },
    }),
  },
  cancelButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 
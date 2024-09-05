import React, { useRef } from 'react';
import { Text, View, Image, StyleSheet, FlatList, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

const data = [
  { id: 'main', label: 'Main' },
  { id: 'index1', label: 'Index 1' },
  { id: 'index2', label: 'Index 2' },
  { id: 'index3', label: 'Index 3' },
  { id: 'index4', label: 'Index 4' },
  { id: 'index5', label: 'Index 5' },
  { id: 'index6', label: 'Index 6' },
  { id: 'index7', label: 'Index 7' },
];

const Index = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * screenHeight / 4,
      index * screenHeight / 4,
      (index + 1) * screenHeight / 4
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.8, 1.2, 0.8],
      extrapolate: 'clamp'
    });

    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp'
    });

    const centerOffset = screenHeight / 2 - (index * screenHeight / 4 + screenHeight / 8); // Center offset calculation

    const backgroundColor = scrollY.interpolate({
      inputRange: [
        (index - 1) * screenHeight / 4 - screenHeight / 4,
        index * screenHeight / 4 - screenHeight / 8,
        index * screenHeight / 4 + screenHeight / 8,
        (index + 1) * screenHeight / 4 + screenHeight / 4
      ],
      outputRange: [
        item.id === 'main' ? '#FFFFE0' : '#D0D0D0',
        item.id === 'main' ? '#FFFFE0' : '#D0D0D0',
        '#FFFFE0',
        '#D0D0D0'
      ],
      extrapolate: 'clamp'
    });

    const handlePress = () => {
      navigation.navigate(`${item.id.charAt(0).toUpperCase() + item.id.slice(1)}Page`);
    };

    return (
      <Animated.View
        style={[
          styles.itemContainer,
          {
            height: screenHeight / 4,
            transform: [{ scale }],
            opacity,
            backgroundColor
          }
        ]}
      >
        <TouchableOpacity onPress={handlePress} style={styles.touchableArea}>
          <View style={styles.imageContainer}>
            <Image
              source={require('./pictures/apple.jpg')}
              style={styles.image}
            />
          </View>
          <View style={[styles.textBox, item.id === 'main' ? styles.mainTextBox : styles.indexTextBox]}>
            <Text style={styles.text}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Animated.FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingBottom: screenHeight / 4 }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  imageContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    width: '25%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTextBox: {
    backgroundColor: '#FFFFE0',
    marginLeft: '12.5%',
  },
  indexTextBox: {
    backgroundColor: '#D0D0D0',
    marginLeft: '12.5%',
  },
  image: {
    width: 50,
    height: 50,
  },
  text: {
    textAlign: 'center',
    color: '#000000',
  },
  touchableArea: {
    flexDirection: 'row',
    flex: 1,
  }
});

export default Index;

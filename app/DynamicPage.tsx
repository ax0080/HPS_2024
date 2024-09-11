import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

const DynamicPage = () => {
  const route = useRoute();
  const { name, category, expiration_date, imageUrl } = route.params || {};

  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
        <Image
          source={{ uri: imageUrl }}
          style={styles.largeImage}
          onLoadEnd={() => setLoading(false)} 
          onError={(error) => console.log('Image failed to load:', error)} 
        />
        <View style={styles.textBox}>
          <Text style={styles.text}>{`Name: ${name}`}</Text>
          <Text style={styles.text}>{`Category: ${category}`}</Text>
          <Text style={styles.text}>{`Expiration Date: ${expiration_date}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeImage: {
    width: '100%', 
    height: screenHeight * 0.4, 
    resizeMode: 'contain', 
    borderRadius: 20, // Rounded corners for the image
    position: 'absolute',
    top: screenHeight * 0.3 - (screenHeight * 0.4) / 2, // Move image center to 1/4 from top
  },
  textBox: {
    width: '90%',
    backgroundColor: '#D9D9D9',
    padding: 10,
    borderRadius: 20, // Rounded corners for the text box
    position: 'absolute', 
    bottom: screenHeight * 0.2 - 50, // Move text box center to 1/4 from bottom
    alignItems: 'flex-start', // Align text to the left
  },
  text: {
    textAlign: 'left',
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Arial',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20, 
    marginTop: -20, 
  },
});

export default DynamicPage;

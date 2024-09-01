import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function Index() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={() => navigation.navigate('MainPage')}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require('./pictures/apple.jpg')}
            style={[styles.image, styles.mainImage, styles.mainImageOffset]}
          />
        </View>
        <View style={[styles.textBox, styles.mainTextBox]}>
          <Text style={styles.textMain}>Main</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.sortContainer}>
        <Text style={styles.sortText}>Sort</Text>
      </View>
      <TouchableOpacity
        style={styles.indexContainer}
        onPress={() => navigation.navigate('Index1Page')}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require('./pictures/apple.jpg')}
            style={[styles.image, styles.imageOffset]}
          />
        </View>
        <View style={[styles.textBox, styles.indexTextBox]}>
          <Text style={styles.textIndex}>Index 1</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.indexContainer}
        onPress={() => navigation.navigate('Index2Page')}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require('./pictures/apple.jpg')}
            style={[styles.image, styles.imageOffset]}
          />
        </View>
        <View style={[styles.textBox, styles.indexTextBox]}>
          <Text style={styles.textIndex}>Index 2</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.indexContainer}
        onPress={() => navigation.navigate('Index3Page')}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require('./pictures/apple.jpg')}
            style={[styles.image, styles.imageOffset]}
          />
        </View>
        <View style={[styles.textBox, styles.indexTextBox]}>
          <Text style={styles.textIndex}>Index 3</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#DDDDDD',
  },
  mainContainer: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortContainer: {
    flex: 0.2,
    backgroundColor: '#444444',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortText: {
    color: '#FFFFFF',
  },
  indexContainer: {
    flex: 1,
    backgroundColor: '#AAAAAA',
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: '50%', // Ensure the image takes up the left half of the container
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBox: {
    width: '25%', // Text box width is now half of its original size
    backgroundColor: '#E0E0E0', // Light gray background color for the index text boxes
    paddingHorizontal: 10,
    paddingVertical: 50, // Increased padding to make the text box height double
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainTextBox: {
    backgroundColor: '#FFFFE0', // Light yellow background color for the main text box
    marginLeft: '12.5%', // Adjusted to maintain the center position of the text box
  },
  indexTextBox: {
    backgroundColor: '#D0D0D0', // Different background color for index text boxes
    marginLeft: '12.5%', // Adjusted to maintain the center position of the text box
  },
  image: {
    width: 100,
    height: 100,
  },
  imageOffset: {
    marginLeft: '25%', // Move image 1/4 of the page width to the right
  },
  mainImage: {
    width: 200, // Twice the size of other images
    height: 200, // Twice the size of other images
  },
  mainImageOffset: {
    marginLeft: '12.5%', // Adjusted to maintain relative position with doubled size
  },
  textMain: {
    textAlign: 'center', // Center the text within the text box
    color: '#000000',
  },
  textIndex: {
    textAlign: 'center', // Center the text within the text box
    color: '#000000',
  },
});

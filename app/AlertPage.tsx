// AlertPage.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenHeight = Dimensions.get('window').height;

const AlertPage = () => {
  const navigation = useNavigation();

  const handleAcknowledge = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.alertText}>
          Some items are expiring soon (within 3 days)!
        </Text>
        <Button title="I know" onPress={handleAcknowledge} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f8d7da',
    alignItems: 'center',
  },
  alertText: {
    fontSize: 20,
    color: '#721c24',
    marginBottom: 20,
  },
});

export default AlertPage;

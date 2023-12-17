//EditService.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const EditService = ({ route }) => {
  const { service } = route.params;
  const navigation = useNavigation();

  const [editedServiceName, setEditedServiceName] = useState(service.name);
  const [editedServiceDescription, setEditedServiceDescription] = useState(service.description);

  const updateService = async () => {
    try {
      await firestore().collection('services').doc(service.id).update({
        name: editedServiceName,
        description: editedServiceDescription,
      });

      console.log('Dịch vụ đã được cập nhật thành công trong Firestore');
      Alert.alert('Success', 'Dịch vụ đã được cập nhật thành công trong Firestore');
      navigation.navigate('Admin');
    } catch (error) {
      console.error('Lỗi khi cập nhật dịch vụ trong Firestore:', error);
      Alert.alert('Error', 'Lỗi khi cập nhật dịch vụ trong Firestore');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên dịch vụ"
        value={editedServiceName}
        onChangeText={(text) => setEditedServiceName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mô tả dịch vụ"
        value={editedServiceDescription}
        onChangeText={(text) => setEditedServiceDescription(text)}
      />
      <Button title="Cập nhật Dịch Vụ" onPress={updateService} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default EditService;

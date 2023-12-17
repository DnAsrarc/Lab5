// Admin.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Admin = () => {
  const [services, setServices] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Truy vấn danh sách dịch vụ từ Firestore
    const unsubscribe = firestore()
      .collection('services')
      .onSnapshot((querySnapshot) => {
        const servicesList = [];
        querySnapshot.forEach((documentSnapshot) => {
          servicesList.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setServices(servicesList);
      });

    // Hủy đăng ký lắng nghe khi component bị hủy
    return () => unsubscribe();
  }, []);

  const navigateToAddNewService = () => {
    navigation.navigate('AddNewService');
  };
  
  const navigateToUserProfile = () => {
    navigation.navigate('UserProfile'); 
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}> 
        <Text style={styles.title}>Danh sách dịch vụ</Text>
        <TouchableOpacity
          style={styles.userIcon}
          onPress={navigateToUserProfile}
        >
          <Ionicons name="person" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigation.navigate('ServiceDetail', { service: item })}
          >
            <Text>{item.name}</Text>
            <Text>{item.description} VND</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={navigateToAddNewService}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userIcon: {
    position: 'absolute',
    top: -5,
    right: 0,
    width: 30,
  },
  serviceItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#eee',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Admin;

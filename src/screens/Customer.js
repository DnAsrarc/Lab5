// Customer.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Customer = () => {
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

  const navigateToServiceDetail = (service) => {
    navigation.navigate('ServiceDetail', { service });
  };

  const navigateToOrderService = (service) => {
    navigation.navigate('OrderService', { service });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách dịch vụ</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => navigateToServiceDetail(item)}
          >
            <Text>{item.name}</Text>
            <TouchableOpacity
              style={styles.orderButton}
              onPress={() => navigateToOrderService(item)}
            >
              <Text style={styles.orderButtonText}>Đặt hàng</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  orderButton: {
    backgroundColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  orderButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Customer;

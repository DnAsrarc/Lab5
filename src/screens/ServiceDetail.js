//ServiceDetail.js
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ServiceDetail = ({ route }) => {
  const { service } = route.params;
  const navigation = useNavigation();

  const deleteService = async () => {
    try {
      await firestore().collection('services').doc(service.id).delete();
      console.log('Dịch vụ đã được xóa thành công khỏi Firestore');
      navigation.navigate('Admin');
    } catch (error) {
      console.error('Lỗi khi xóa dịch vụ khỏi Firestore:', error);
      Alert.alert('Error', 'Lỗi khi xóa dịch vụ khỏi Firestore');
    }
  };

  const editService = () => {
    navigation.navigate('EditService', { service });
  };

  const confirmDeleteService = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xóa dịch vụ này?',
      [
        { text: 'Hủy bỏ', style: 'cancel' },
        { text: 'Xóa', onPress: deleteService, style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Service Detail</Text>
        <Menu style={styles.menu}>
          <MenuTrigger text="&#8942;"/>
          <MenuOptions>
            <MenuOption onSelect={editService} text="Sửa dịch vụ" />
            <MenuOption onSelect={confirmDeleteService} text="Xóa dịch vụ" />
          </MenuOptions>
        </Menu>
      </View>
      <Text>Tên dịch vụ: {service.name}</Text>
      <Text>Giá dịch vụ: {service.description} VND</Text>
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
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,   // Kích thước chiều rộng
  },
});

export default ServiceDetail;

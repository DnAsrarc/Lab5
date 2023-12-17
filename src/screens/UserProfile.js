// UserProfile.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMyContextController, logout } from '../context';

const UserProfile = ({ navigation }) => {
  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;

  // Kiểm tra xem userLogin có giá trị không null
  if (!userLogin) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Thông tin cá nhân</Text>
        <Text>Vui lòng đăng nhập để xem thông tin cá nhân.</Text>
      </View>
    );
  }

  const navigateToSetting = () => {
    navigation.navigate('Setting');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin cá nhân</Text>
      <Text>Tên: {userLogin.name}</Text>
      <Text>Email: {userLogin.email}</Text>
      <Text>Số điện thoại: {userLogin.phone}</Text>
      <Text>Địa chỉ: {userLogin.address}</Text>
      <Text>Vai trò: {userLogin.role}</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToSetting}>
        <Text style={styles.buttonText}>Cài đặt</Text>
      </TouchableOpacity>
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
  button: {
    marginTop: 16,
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default UserProfile;

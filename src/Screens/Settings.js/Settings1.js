import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {formHead} from '../../Commoncss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings1 = ({navigation}) => {
  const logout = () => {
    AsyncStorage.removeItem('user').then(() => {
      navigation.navigate('Login');
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('My_userProfile')}
        style={styles.gohomeicon}>
        <Image
          source={require('../../../assets/back.png')}
          style={{width: 30, height: 30}}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text style={formHead}>Settings</Text>
      <Text
        style={styles.txt1}
        onPress={() => navigation.navigate('EditProfile')}>
        Edit Profile
      </Text>
      <Text
        style={styles.txt1}
        onPress={() => navigation.navigate('ChangePassword')}>
        Change Password
      </Text>
      <Text style={styles.txt1}>Customer Support</Text>
      <Text style={styles.txt1} onPress={() => logout()}>
        Logout
      </Text>
    </View>
  );
};

export default Settings1;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  txt1: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    borderBottomColor: 'gray',
    borderWidth: 1,
  },
});

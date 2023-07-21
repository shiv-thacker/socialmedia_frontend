import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {containerFull, goback, logo1} from '../../Commoncss/pagecss';
import logo from '../../../assets/logo.png';
import {formHead2, formInput, formbtn} from '../../Commoncss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangeUsername = ({navigation}) => {
  const [username, setusername] = useState('');
  const [loading, setloading] = useState(false);

  const handleUsername = () => {
    if (username == '') {
      Alert.alert('Please enter username');
    } else {
      setloading(true);
      AsyncStorage.getItem('user')
        .then(async data => {
          fetch('http://192.168.0.106:8000/setusername', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: JSON.parse(data).user.email,
              username: username,
            }), //to send in string format
          })
            .then(res => res.json())
            .then(data => {
              if (data.message == 'Username updated') {
                setloading(false);
                Alert.alert('username updated');
                navigation.navigate('Settings1');
              } else if (data.error == 'Sorry username already exist') {
                setloading(false);
                Alert.alert('username already exist');
              } else {
                setloading(false);
                Alert.alert('SOmething went wrong, please login');
                AsyncStorage.removeItem('user');
                navigation.navigate('Login');
              }
            })
            .catch(err => {
              Alert.alert('Server Error');
            });
        })
        .catch(err => Alert.alert('error in async'));
    }
  };

  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings1')}
        style={goback}>
        <Image
          source={require('../../../assets/back.png')}
          style={{width: '18%', height: '100%'}}
        />
        <Text
          style={{
            color: 'gray',
            fontSize: 16,
            marginLeft: 5,
            fontWeight: 'bold',
          }}>
          Go Back
        </Text>
      </TouchableOpacity>

      <Image source={logo} style={logo1} />
      <Text style={formHead2}>Change Username</Text>
      <TextInput
        placeholder="Enter new username"
        style={formInput}
        onChangeText={text => setusername(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleUsername()}>
          Save
        </Text>
      )}
    </View>
  );
};

export default ChangeUsername;

const styles = StyleSheet.create({});

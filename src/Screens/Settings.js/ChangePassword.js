import {
  Alert,
  ActivityIndicator,
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
import {
  formHead2,
  formInput,
  formbtn,
  formTextLinkRight,
} from '../../Commoncss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = ({navigation}) => {
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [confirmnewpassword, setConfirmnewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handlesetpassword = () => {
    if (oldpassword === '' || newpassword === '' || confirmnewpassword === '') {
      Alert.alert('please fill all the feilds');
    } else if (newpassword != confirmnewpassword) {
      Alert.alert('new password & confirm  password not matching');
    } else {
      setLoading(true);
      AsyncStorage.getItem('user').then(async data => {
        fetch('http://192.168.0.106:8000/changepassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(data).token,
          },
          body: JSON.stringify({
            oldpassword: oldpassword,
            newpassword: newpassword,
            email: JSON.parse(data).user.email,
          }),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.message == 'Your password changed successfully') {
              Alert.alert('Your password changed successfully');
              setLoading(false);
              AsyncStorage.removeItem('user');
              navigation.navigate('Login');
            } else {
              Alert.alert('Sorry, can you please try again after some time');
              setLoading(false);
            }
          });
      });
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
      <Text style={formHead2}>Choose a strong password</Text>
      <TextInput
        placeholder="Enter Old password"
        style={formInput}
        secureTextEntry
        onChangeText={text => setOldpassword(text)}
      />
      <TextInput
        placeholder="Enter password"
        style={formInput}
        secureTextEntry
        onChangeText={text => setNewpassword(text)}
      />
      <TextInput
        placeholder="Confirm password"
        style={formInput}
        secureTextEntry
        onChangeText={text => setConfirmnewPassword(text)}
      />
      <Text
        style={formTextLinkRight}
        onPress={() => navigation.navigate('ForgotPassword_EnterEmail')}>
        Forgot Password
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handlesetpassword()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});

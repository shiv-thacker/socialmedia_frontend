import {StyleSheet, Text, View, Image, TextInput} from 'react-native';
import React from 'react';
import logo from '../../../../assets/logo.png';
import {containerFull, hr80, logo1} from '../../../Commoncss/pagecss';
import {
  formHead,
  formInput,
  formTextLinkCenter,
  formTextLinkRight,
  formbtn,
} from '../../../Commoncss/formcss';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={containerFull}>
      <Image source={logo} style={logo1} />
      <Text style={formHead}>Login</Text>
      <TextInput placeholder="Enter Your Emial" style={formInput} />
      <TextInput
        placeholder="Enter Your Password"
        style={formInput}
        secureTextEntry={true}
      />
      <Text
        style={formTextLinkRight}
        onPress={() => navigation.navigate('ForgotPassword_EnterEmail')}>
        Forgot Password
      </Text>
      <Text style={formbtn} onPress={() => navigation.navigate('MainPage')}>
        Submit
      </Text>
      <View style={hr80}></View>

      <Text style={formTextLinkCenter}>
        Don't have an account?{' '}
        <Text
          style={{color: 'white'}}
          onPress={() => navigation.navigate('Signup_EnterEmail')}>
          Signup
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});

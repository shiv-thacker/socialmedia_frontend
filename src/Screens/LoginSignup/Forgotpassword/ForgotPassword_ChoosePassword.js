import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {containerFull, goback, logo1} from '../../../Commoncss/pagecss';
import logo from '../../../../assets/logo.png';
import {formHead2, formInput, formbtn} from '../../../Commoncss/formcss';

const ForgotPassword_ChoosePassword = ({navigation}) => {
  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={goback}>
        <Image
          source={require('../../../../assets/back.png')}
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
        placeholder="Enter password"
        style={formInput}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm password"
        style={formInput}
        secureTextEntry
      />
      <Text
        style={formbtn}
        onPress={() => navigation.navigate('ForgotPassword_AccountRecovered')}>
        Next
      </Text>
    </View>
  );
};

export default ForgotPassword_ChoosePassword;

const styles = StyleSheet.create({});

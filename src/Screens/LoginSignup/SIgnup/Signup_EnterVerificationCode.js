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
import Icon from 'react-native-vector-icons/AntDesign';
import logo from '../../../../assets/logo.png';
import {
  formHead2,
  formHead3,
  formInput,
  formbtn,
} from '../../../Commoncss/formcss';

const Signup_EnterVerificationCode = ({navigation}) => {
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
      <Text style={formHead3}>
        A verification code has been sent to your email address.
      </Text>
      <TextInput placeholder="Enter 6-Digit Code here" style={formInput} />
      <Text
        style={formbtn}
        onPress={() => navigation.navigate('Signup_ChooseUsername')}>
        Next
      </Text>
    </View>
  );
};

export default Signup_EnterVerificationCode;

const styles = StyleSheet.create({});

import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {containerFull, goback, logo1} from '../../../Commoncss/pagecss';
import Icon from 'react-native-vector-icons/AntDesign';
import logo from '../../../../assets/logo.png';
import {
  formHead2,
  formHead3,
  formInput,
  formbtn,
} from '../../../Commoncss/formcss';

const ForgotPassword_EnterVerificationCode = ({navigation, route}) => {
  const {useremail, userVerificationcode} = route.params;
  const [verificationcode, setverificationcode] = useState('');

  const handleverificationcode = () => {
    if (verificationcode != userVerificationcode) {
      Alert.alert('Invalid Verification Code');
    } else if (verificationcode == userVerificationcode) {
      Alert.alert('Verification Code Matched');
      navigation.navigate('ForgotPassword_ChoosePassword', {email: useremail});
    } else {
      Alert.alert('Please try again');
    }
  };
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
      <TextInput
        placeholder="Enter 6-Digit Code here"
        style={formInput}
        onChangeText={text => setverificationcode(text)}
      />
      <Text style={formbtn} onPress={() => handleverificationcode()}>
        Next
      </Text>
    </View>
  );
};

export default ForgotPassword_EnterVerificationCode;

const styles = StyleSheet.create({});

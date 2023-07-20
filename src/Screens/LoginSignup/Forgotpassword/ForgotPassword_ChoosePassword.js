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
import {containerFull, goback, logo1} from '../../../Commoncss/pagecss';
import logo from '../../../../assets/logo.png';
import {formHead2, formInput, formbtn} from '../../../Commoncss/formcss';

const ForgotPassword_ChoosePassword = ({navigation, route}) => {
  const {email} = route.params;

  const [password, setPassword] = useState('');
  const [confirmpassword, setconfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handlesetpassword = () => {
    if (!password || !confirmpassword) {
      Alert.alert('please fill all details');
    } else if (password != confirmpassword) {
      Alert.alert('Your password is not matching');
    } else {
      setLoading(true);
      fetch('http://192.168.0.106:8000/resetpassword', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
        }), //to send in string format
      })
        .then(res => res.json())
        .then(data => {
          if (data.message == 'Password change successfully') {
            setLoading(false);
            Alert.alert(data.message);
            navigation.navigate('ForgotPassword_AccountRecovered');
          } else {
            setLoading(false);
            Alert.alert('please try again');
          }
        })
        .catch(err => {
          setLoading(false);
          Alert.alert('catch err : ', err);
        });
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
      <Text style={formHead2}>Choose a strong password</Text>
      <TextInput
        placeholder="Enter password"
        style={formInput}
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm password"
        style={formInput}
        secureTextEntry
        onChangeText={text => setconfirmPassword(text)}
      />
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

export default ForgotPassword_ChoosePassword;

const styles = StyleSheet.create({});

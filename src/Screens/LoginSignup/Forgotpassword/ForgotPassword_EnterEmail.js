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
import {containerFull, goback, logo1} from '../../../Commoncss/pagecss';
import Icon from 'react-native-vector-icons/AntDesign';
import logo from '../../../../assets/logo.png';
import {formHead2, formInput, formbtn} from '../../../Commoncss/formcss';

const ForgotPassword_EnterEmail = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setloading] = useState(false);

  const handleEmail = () => {
    if (email === '') {
      Alert.alert('please enter email');
    } else {
      setloading(true);
      fetch('http://192.168.0.106:8000/verifyfp', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
        }), //to send in string format
      })
        .then(res => res.json())
        .then(data => {
          if (data.error === 'Email Not Exist') {
            Alert.alert('User not Exist');
            setloading(false);
          } else if (data.message === 'Verification code sent') {
            setloading(false);
            Alert.alert(data.message);
            navigation.navigate('ForgotPassword_EnterVerificationCode', {
              useremail: data.email,
              userVerificationcode: data.VerificationCode,
            });
          }
        })
        .catch(error => {
          console.error(error); // Handle the error appropriately
          setloading(false); // Set loading to false in case of an error
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
      <Text style={formHead2}> Verify Your Email</Text>
      <TextInput
        placeholder="Enter Your Email"
        style={formInput}
        onChangeText={text => setEmail(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleEmail()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default ForgotPassword_EnterEmail;

const styles = StyleSheet.create({});

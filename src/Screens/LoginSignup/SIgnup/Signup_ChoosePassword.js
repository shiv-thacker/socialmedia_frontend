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
import logo from '../../../../assets/logo.png';
import {formHead2, formInput, formbtn} from '../../../Commoncss/formcss';

const Signup_ChoosePassword = ({navigation, route}) => {
  const {email, username} = route.params;

  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [loading, setloading] = useState(false);

  const handlepassword = () => {
    if (password == '' || confirmpassword == '') {
      Alert.alert('Please Enter Password');
    } else if (password != confirmpassword) {
      Alert.alert('Password does not match');
    } else {
      setloading(true);
      fetch('http://192.168.0.106:8000/signup', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }), //to send in string format
      })
        .then(res => res.json())
        .then(data => {
          console.log(
            ` email : ${email},username : ${username}, password : ${password}`,
          );
          if (
            data.message === 'User Registered Successfully & Token Generated'
          ) {
            setloading(false);
            Alert.alert('User Registered Successfully');
            navigation.navigate('Login');
          } else {
            setloading(false);
            Alert.alert('Please Try Again');
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
      <Text style={formHead2}>Choose a strong password</Text>
      <TextInput
        placeholder="Enter password"
        style={formInput}
        secureTextEntry
        onChangeText={text => setpassword(text)}
      />
      <TextInput
        placeholder="Confirm password"
        style={formInput}
        secureTextEntry
        onChangeText={text => setconfirmpassword(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handlepassword()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default Signup_ChoosePassword;

const styles = StyleSheet.create({});

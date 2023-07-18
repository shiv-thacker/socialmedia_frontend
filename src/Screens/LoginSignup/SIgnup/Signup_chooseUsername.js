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

const Signup_ChooseUsername = ({navigation, route}) => {
  const {email} = route.params;
  const [username, setusername] = useState('');
  const [loading, setloading] = useState(false);

  const handleUsername = () => {
    console.log(` email : ${email}`);
    if (username == '') {
      Alert.alert('Please enter username');
    } else {
      setloading(true);
      fetch('http://192.168.0.106:8000/changeusername', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, username: username}), //to send in string format
      })
        //now convert response in json
        .then(res => res.json())
        .then(data => {
          if (data.message === 'Username available') {
            setloading(false);
            Alert.alert('Username has been set succesfully');
            navigation.navigate('Signup_ChoosePassword', {
              email: email,
              username: username,
            });
          } else {
            setloading(false);
            Alert.alert(data.error);
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
      <Text style={formHead2}>Choose A Username</Text>
      <TextInput
        placeholder="Enter a username"
        style={formInput}
        onChangeText={text => setusername(text)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleUsername()}>
          Next
        </Text>
      )}
    </View>
  );
};

export default Signup_ChooseUsername;

const styles = StyleSheet.create({});

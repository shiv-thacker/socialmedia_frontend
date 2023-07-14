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

const Signup_ChooseUsername = ({navigation}) => {
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
      <TextInput placeholder="Enter a username" style={formInput} />
      <Text
        style={formbtn}
        onPress={() => navigation.navigate('Signup_ChoosePassword')}>
        Next
      </Text>
    </View>
  );
};

export default Signup_ChooseUsername;

const styles = StyleSheet.create({});

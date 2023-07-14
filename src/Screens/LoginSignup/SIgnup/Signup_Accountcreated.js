import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {containerFull, goback, logo1, row} from '../../../Commoncss/pagecss';
import logo from '../../../../assets/logo.png';
import {formHead2, formInput, formbtn} from '../../../Commoncss/formcss';

const Signup_Accountcreated = ({navigation}) => {
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

      <View style={row}>
        <Image
          source={require('../../../../assets/check.png')}
          style={{width: 20, height: 20}}
        />
        <Text style={{color: 'white'}}> Account Created Successfully</Text>
      </View>
      <Text style={formbtn} onPress={() => navigation.navigate('Login')}>
        Let's Roll
      </Text>
    </View>
  );
};

export default Signup_Accountcreated;

const styles = StyleSheet.create({});

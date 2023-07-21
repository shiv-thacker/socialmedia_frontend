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
import {containerFull, goback, logo1} from '../../Commoncss/pagecss';
import logo from '../../../assets/logo.png';
import {formHead2, formInput, formbtn} from '../../Commoncss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangeDescription = ({navigation}) => {
  const [description, setDescription] = useState('');
  const [loading, setloading] = useState(false);

  const handleDescription = () => {
    if (description == '') {
      Alert.alert('Please enter username');
    } else {
      setloading(true);
      AsyncStorage.getItem('user')
        .then(async data => {
          fetch('http://192.168.0.106:8000/setdescription', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: JSON.parse(data).user.email,
              description: description,
            }), //to send in string format
          })
            .then(res => res.json())
            .then(data => {
              if (data.message == 'Description added successfully') {
                setloading(false);
                Alert.alert('description updated');
                navigation.navigate('Settings1');
              } else {
                setloading(false);
                Alert.alert('SOmething went wrong, please login');
                AsyncStorage.removeItem('user');
                navigation.navigate('Login');
              }
            })
            .catch(err => {
              Alert.alert('Server Error');
            });
        })
        .catch(err => Alert.alert('error in async'));
    }
  };

  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings1')}
        style={goback}>
        <Image
          source={require('../../../assets/back.png')}
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
      <Text style={formHead2}>Change description</Text>
      <TextInput
        placeholder="Enter new Description"
        style={formInput}
        onChangeText={text => setDescription(text)}
        numberOfLines={5}
      />
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleDescription()}>
          Save
        </Text>
      )}
    </View>
  );
};

export default ChangeDescription;

const styles = StyleSheet.create({});

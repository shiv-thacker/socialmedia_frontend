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
import ImagePicker from 'react-native-image-crop-picker';

const UploadProfilePicture = ({navigation}) => {
  const [loading, setloading] = useState(false);

  const handleprofilepic = () => {
    Alert.alert(
      'Three Button Alert',
      'Choose an action:',
      [
        {text: 'CAMERA', onPress: () => uploadfromcamera()},
        {text: 'GALLERY', onPress: () => uploadfromgallary()},
      ],
      {cancelable: true},
    );
  };

  const uploadfromcamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };
  const uploadfromgallary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <View style={containerFull}>
      <TouchableOpacity
        onPress={() => navigation.navigate('EditProfile')}
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
      <Text style={formHead2}>Choose Profile Pic</Text>
      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleprofilepic()}>
          Upload
        </Text>
      )}
    </View>
  );
};

export default UploadProfilePicture;

const styles = StyleSheet.create({});

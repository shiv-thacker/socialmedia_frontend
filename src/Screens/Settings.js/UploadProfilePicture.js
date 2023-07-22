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
import React, {useState, useEffect} from 'react';
import {containerFull, goback, logo1} from '../../Commoncss/pagecss';
import logo from '../../../assets/logo.png';
import {formHead2, formInput, formbtn} from '../../Commoncss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const UploadProfilePicture = ({navigation}) => {
  const [imageData, setImagedata] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setloading] = useState(false);
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);

  useEffect(() => {
    if (isNewImageSelected) {
      generateurl();
    }
  }, [isNewImageSelected]);

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

  const uploadfromcamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      setImagedata(image.path);
      setIsNewImageSelected(true);
    });
  };
  const uploadfromgallary = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(async image => {
      setImagedata(image.path);
      setIsNewImageSelected(true);
    });
  };

  const generateurl = async () => {
    // create bucket storage reference to not yet existing image
    const reference = storage().ref(imageData);
    await reference.putFile(imageData);

    //for grnerate download link
    const url = await reference.getDownloadURL();
    console.log(url);
    setIsNewImageSelected(false);
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
      {imageData !== null ? (
        <Image source={{uri: imageData}} style={{width: 200, height: 200}} />
      ) : null}
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

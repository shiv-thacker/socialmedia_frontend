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
  const [imageData, setImagedata] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setloading] = useState(false);
  const [isNewImageSelected, setIsNewImageSelected] = useState(false);

  // useEffect(() => {
  //   if (isNewImageSelected) {
  //     generateurl();
  //   }
  // }, [isNewImageSelected]);

  const handleprofilepic = () => {
    // uploadfromgallary();
    AsyncStorage.getItem('user').then(data => {
      console.log('async data', data);
      setloading(true);
      uploadfromgallary().then(url => {
        if (url) {
          fetch('http://192.168.0.106:8000/setprofilepic', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: JSON.parse(data).user.email,
              profilepic: url,
            }),
          })
            .then(res => res.json())
            .then(data => {
              if (data.message == 'profile pic updated') {
                Alert.alert('Image upload successfully');
                setloading(false);
                setImagedata(data.uri);
              } else if (data.error == 'emial is not available') {
                Alert.alert('Sorry, Please login again,your email is invalis');
              } else {
                Alert.alert(
                  'Sorry, Profile pic does not uploaded beacause some issue',
                );
              }
            });
        } else {
          Alert.alert('please select image');
          console.log('image is not selected');
          setloading(false);
        }
      });
    }); // Alert.alert(
    //   'Three Button Alert',
    //   'Choose an action:',
    //   [
    //     {text: 'CAMERA', onPress: () => uploadfromcamera()},
    //     {text: 'GALLERY', onPress: () => uploadfromgallary()},
    //   ],
    //   {cancelable: true},
    // );
  };

  // const uploadfromcamera = async () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(async image => {
  //     //setImagedata(image.path);
  //     //setIsNewImageSelected(true);
  //   });
  // };
  const uploadfromgallary = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      console.log(image.path);

      if (!image.path) {
        Alert.alert('User has not selected any image');
        return null;
      } else {
        // create bucket storage reference to not yet existing image
        const reference = storage().ref(image.path);
        await reference.putFile(image.path);
        //for generate download link
        const url = await reference.getDownloadURL();
        console.log(url);
        return url;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // const generateurl = async () => {
  //   if (imageData == null) {
  //     return null;
  //     Alert.alert('user has not selected any image');
  //   } else {
  //     // create bucket storage reference to not yet existing image
  //     const reference = storage().ref(imageData);
  //     await reference.putFile(imageData);
  //     //for grnerate download link
  //     const url = await reference.getDownloadURL();
  //     console.log(url);
  //     // setIsNewImageSelected(false);
  //   }
  // };

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

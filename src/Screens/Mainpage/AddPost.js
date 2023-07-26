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
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const AddPost = ({navigation}) => {
  const [postdescription, setpostDescription] = useState('');
  const [loading1, setloading1] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [post, setPost] = useState('');

  const pickimage = async () => {
    setloading1(true);
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });

      console.log(image.path);

      if (!image.path) {
        Alert.alert('User has not selected any image');
        setloading1(false);
        setPost('');
        return null;
      } else {
        // create bucket storage reference to not yet existing image
        const reference = storage().ref(image.path);
        await reference.putFile(image.path);
        //for generate download link
        const url = await reference.getDownloadURL();
        console.log(url);
        setPost(url);
        setloading1(false);
        return url;
      }
    } catch (error) {
      console.error(error);
      setloading1(false);
      return null;
    }
  };
  const handleUpload = () => {
    if (post != '') {
      console.log('post', post);
      AsyncStorage.getItem('user')
        .then(async data => {
          console.log('Value from AsyncStorage:', data);
          setloading2(true);
          console.log('Hii am going to fetch');
          fetch('http://192.168.0.106:8000/addpost', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: JSON.parse(data).user.email,
              username: JSON.parse(data).user.username,
              postdescription: postdescription,
              post: post,
            }),
          })
            .then(res => res.json())
            .then(data => {
              console.log('Hii am out from fetch');
              if (data.message == 'post updated') {
                Alert.alert('post added successfully');
                setloading2(false);
                navigation.navigate('My_userProfile');
              } else {
                Alert.alert(data.error);
                setloading2(false);
              }
            })
            .catch(err => {
              setloading2(false);
              Alert.alert('error in fetch data', err);
              console.log(err);
            });
        })
        .catch(err => {
          setloading2(false);
          Alert.alert('async error', err);
          console.log(err);
        });
    } else {
      Alert.alert(' Please select an image');
    }
  };
  //     if (description == '') {
  //       Alert.alert('Please enter username');
  //     } else {
  //       setloading(true);
  //       AsyncStorage.getItem('user')
  //         .then(async data => {
  //           fetch('http://192.168.0.106:8000/setdescription', {
  //             method: 'POST',
  //             headers: {'Content-Type': 'application/json'},
  //             body: JSON.stringify({
  //               email: JSON.parse(data).user.email,
  //               description: description,
  //             }), //to send in string format
  //           })
  //             .then(res => res.json())
  //             .then(data => {
  //               if (data.message == 'Description added successfully') {
  //                 setloading(false);
  //                 Alert.alert('description updated');
  //                 navigation.navigate('Settings1');
  //               } else {
  //                 setloading(false);
  //                 Alert.alert('SOmething went wrong, please login');
  //                 AsyncStorage.removeItem('user');
  //                 navigation.navigate('Login');
  //               }
  //             })
  //             .catch(err => {
  //               Alert.alert('Server Error');
  //             });
  //         })
  //         .catch(err => Alert.alert('error in async'));
  //     }
  //   };

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
      {loading1 ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          <Text style={formHead2}> Add New Post</Text>
          {post ? (
            <TouchableOpacity onPress={() => pickimage()}>
              <Image
                source={{uri: post}}
                style={{width: 200, height: 200, marginVertical: 10}}
              />
            </TouchableOpacity>
          ) : (
            <Text style={styles.addpost} onPress={() => pickimage()}>
              Click here to select
            </Text>
          )}
        </>
      )}

      <Text style={formHead2}>Change description</Text>
      <TextInput
        placeholder="Enter new Description"
        style={formInput}
        onChangeText={text => setpostDescription(text)}
        numberOfLines={5}
      />
      {loading2 ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Text style={formbtn} onPress={() => handleUpload()}>
          Upload
        </Text>
      )}
    </View>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  addpost: {
    fontSize: 20,
    fontWeight: '200',
    color: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 50,
    width: '80%',
    marginVertical: 20,
    textAlign: 'center',
  },
});

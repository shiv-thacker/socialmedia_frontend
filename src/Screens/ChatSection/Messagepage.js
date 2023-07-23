import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import nopic from '../../../assets/user.png';
import {goback} from '../../Commoncss/pagecss';

const Messagepage = ({navigation, route}) => {
  const {fuseremail} = route.params;
  const [ouruserdata, setOuruserdata] = useState(null);
  const [fuserdata, setFuserdata] = useState(null);

  useEffect(() => {
    loaddata();
  }, []);

  const loaddata = async () => {
    AsyncStorage.getItem('user')
      .then(async value => {
        // console.log('async user data', value);
        // setUserdata(JSON.parse(data));
        fetch('http://192.168.0.106:8000/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(value).token,
          },
          body: JSON.stringify({
            email: JSON.parse(value).user.email,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'User found') {
              setOuruserdata(data.user);
              console.log('our user data', data.user.username);

              fetch('http://192.168.0.106:8000/otheruserdata', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: fuseremail}),
              })
                .then(res => res.json())
                .then(data => {
                  if (data.message == 'User found') {
                    console.log(" friend's mail :", data.user.email);
                    setFuserdata(data.user);
                  } else {
                    Alert.alert('User not Found');
                    navigation.navigate('SearchUserPage');
                  }
                })
                .catch(err => {
                  Alert.alert(`Something went wrong`);
                  navigation.navigate('SearchUserPage');
                });
            } else {
              Alert.alert('SOmething went wrong, Login again');
              navigation.navigate('Login');
            }
          })
          .catch(err => navigation.navigate('Login'));
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.s1}>
        <TouchableOpacity onPress={() => navigation.navigate('All_Chats')}>
          <Image
            source={require('../../../assets/back.png')}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
        {fuserdata?.profilepic ? (
          <Image
            source={{uri: fuserdata?.profilepic}}
            style={styles.profilepic}></Image>
        ) : (
          <Image source={nopic} style={styles.profilepic}></Image>
        )}
        <Text style={styles.username}> {fuserdata?.username}</Text>
      </View>
      <View style={styles.sbottom}>
        <TextInput
          style={styles.sbottominput}
          placeholder="type a message"
          placeholderTextColor={'grey'}
        />
        <TouchableOpacity style={styles.sbottombutton}>
          <Text style={{color: 'white', fontSize: 20}}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Messagepage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  profilepic: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginLeft: 10,
  },
  username: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  s1: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    padding: 10,
    marginVertical: 5,
  },
  sbottom: {
    width: '100%',
    height: 50,
    backgroundColor: '#111111',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  sbottominput: {
    padding: 5,
    color: 'white',
  },
});

import {StatusBar, StyleSheet, Text, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {containerFull} from '../../Commoncss/pagecss';
import {formHead} from '../../Commoncss/formcss';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';
import Followers_RandomPost from '../../Components/Followers_RandomPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MainPage = ({navigation}) => {
  const [userdata, setUserdata] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(data => {
        //console.log('async user data', data);
        setUserdata(JSON.parse(data));
      })
      .catch(err => Alert.alert(err));
  }, []);

  console.log('userdata', userdata);

  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} page={'MainPage'} />
      <Bottomnavbar navigation={navigation} page={'MainPage'} />
      <Followers_RandomPost />
    </View>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 60,
  },
});

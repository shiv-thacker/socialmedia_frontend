import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerFull} from '../../Commoncss/pagecss';
import {formHead} from '../../Commoncss/formcss';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';
import Followers_RandomPost from '../../Components/Followers_RandomPost';

const My_userProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} />
      <Bottomnavbar navigation={navigation} page={'My_userProfile'} />
      <Text style={formHead}>Your Profile</Text>
    </View>
  );
};

export default My_userProfile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 60,
  },
});

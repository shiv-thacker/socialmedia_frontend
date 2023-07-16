import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {icon1} from '../Commoncss/pagecss';

const Bottomnavbar = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/home.png')} style={icon1} />
      <Image source={require('../../assets/heart.png')} style={icon1} />
      <Image source={require('../../assets/search.png')} style={icon1} />
      <Image source={require('../../assets/user.png')} style={icon1} />
    </View>
  );
};

export default Bottomnavbar;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#111111',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100, //Zindex used for show bottomnav everytime
    borderTopWidth: 1,
    paddingVertical: 10,
  },
});

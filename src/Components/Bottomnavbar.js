import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {icon1} from '../Commoncss/pagecss';

const Bottomnavbar = ({navigation, page}) => {
  return (
    <View style={styles.container}>
      {page === 'MainPage' ? (
        <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
          <Image
            source={require('../../assets/home.png')}
            style={styles.activeicon1}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('MainPage')}>
          <Image source={require('../../assets/home.png')} style={icon1} />
        </TouchableOpacity>
      )}
      {page === 'SearchUserPage' ? (
        <TouchableOpacity onPress={() => navigation.navigate('SearchUserPage')}>
          <Image
            source={require('../../assets/search.png')}
            style={styles.activeicon1}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('SearchUserPage')}>
          <Image source={require('../../assets/search.png')} style={icon1} />
        </TouchableOpacity>
      )}
      {page === 'NotificationPage' ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationPage')}>
          <Image
            source={require('../../assets/heart.png')}
            style={styles.activeicon1}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate('NotificationPage')}>
          <Image source={require('../../assets/heart.png')} style={icon1} />
        </TouchableOpacity>
      )}

      {page === 'My_userProfile' ? (
        <TouchableOpacity onPress={() => navigation.navigate('My_userProfile')}>
          <Image
            source={require('../../assets/user.png')}
            style={styles.activeicon1}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('My_userProfile')}>
          <Image source={require('../../assets/user.png')} style={icon1} />
        </TouchableOpacity>
      )}
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
    alignItems: 'center',
  },
  activeicon1: {
    backgroundColor: 'grey',
    borderRadius: 12,
    padding: 10,
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
});

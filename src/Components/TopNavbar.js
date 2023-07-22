import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {icon1, logo2} from '../Commoncss/pagecss';

const TopNavbar = ({navigation, page}) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.addpost}
        onPress={() => navigation.navigate('AddPost')}>
        ADD POST
      </Text>
      <Image
        source={require('../../assets/logo.png')}
        style={[logo2, {width: 30, aspectRatio: 1}]}
      />
      {page === 'MainPage' && (
        <TouchableOpacity onPress={() => navigation.navigate('All_Chats')}>
          <Image source={require('../../assets/message.png')} style={icon1} />
        </TouchableOpacity>
      )}

      {page === 'My_userProfile' && (
        <TouchableOpacity onPress={() => navigation.navigate('Settings1')}>
          <Image source={require('../../assets/heart.png')} style={icon1} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TopNavbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    zIndex: 100,
    backgroundColor: '#111111',
  },
  addpost: {
    color: 'white',
    fontSize: 15,
  },
});

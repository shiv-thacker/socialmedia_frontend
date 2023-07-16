import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {icon1, logo2} from '../Commoncss/pagecss';

const TopNavbar = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={[
          logo2,
          {width: 40, borderColor: 'white', borderWidth: 3, aspectRatio: 1},
        ]}
      />
      <TouchableOpacity onPress={() => navigation.navigate('All_Chats')}>
        <Image source={require('../../assets/message.png')} style={icon1} />
      </TouchableOpacity>
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
});

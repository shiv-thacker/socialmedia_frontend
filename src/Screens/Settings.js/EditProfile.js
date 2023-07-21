import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {formHead} from '../../Commoncss/formcss';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Settings1')}
        style={styles.gohomeicon}>
        <Image
          source={require('../../../assets/back.png')}
          style={{width: 30, height: 30}}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text
        style={formHead}
        onPress={() => navigation.navigate('UploadProfilePicture')}>
        Edit Profile
      </Text>
      <Text
        style={styles.txt1}
        onPress={() => navigation.navigate('ChangeUsername')}>
        Change Username
      </Text>
      <Text
        style={styles.txt1}
        onPress={() => navigation.navigate('ChangeDescription')}>
        Change Description
      </Text>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  txt1: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    borderBottomColor: 'gray',
    borderWidth: 1,
  },
});

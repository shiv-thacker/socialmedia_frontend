import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import nopic from '../../assets/user.png';

const UserCard = ({user, navigation}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Other_profile', {user: user});
      }}>
      <View style={styles.chatcard}>
        {user.profilepic ? (
          <Image source={{uri: user.profilepic}} style={styles.image} />
        ) : (
          <Image source={nopic} style={styles.image} />
        )}

        <View style={styles.c1}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.lastmessage}>{user.lastmessage}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  chatcard: {
    width: '100%',
    backgroundColor: '#111111',
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {width: 40, height: 40, borderRadius: 20},
  username: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  c1: {
    marginLeft: 20,
  },
  lastmessage: {
    color: 'gray',
    fontSize: 19,
  },
});

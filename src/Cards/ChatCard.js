import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChatCard = ({chat}) => {
  console.log(chat);
  return (
    <View style={styles.chatcard}>
      <Image source={{uri: chat.profile_image}} style={styles.image} />

      <View style={styles.c1}>
        <Text style={styles.username}>{chat.username}</Text>
        <Text style={styles.lastmessage}>{chat.lastmessage}</Text>
      </View>
    </View>
  );
};

export default ChatCard;

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

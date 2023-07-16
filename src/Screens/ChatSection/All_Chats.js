import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {goback, icon1} from '../../Commoncss/pagecss';
import {formHead2} from '../../Commoncss/formcss';
import ChatCard from '../../Components/ChatCard';

const All_Chats = ({navigation}) => {
  let chats = [
    {
      username: 'user1',
      lastmessage: 'hii',
      time: '12:00',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
    },
    {
      username: 'user2',
      lastmessage: 'hello',
      time: '1:00',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
    },
    {
      username: 'shivang',
      lastmessage: 'hey',
      time: '1:00',
      profile_image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_EpYaHHcu2fUaXML2N0AcOf89x2eS66IRr3BMh5EJfVkEy3M4&s',
    },
  ];

  const [keyword, setkeyword] = useState('');

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('MainPage')}
        style={styles.gohomeicon}>
        <Image
          source={require('../../../assets/back.png')}
          style={{width: 30, height: 30}}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.c1}>
        <Text style={formHead2}>Your Chats</Text>
        <TextInput
          style={styles.searchbar}
          placeholder="Search"
          onChangeText={text => setkeyword(text)}
        />
      </View>
      <View style={styles.c2}>
        {chats
          .filter(chat => {
            if (keyword == '') {
              return chat;
            } else if (
              chat.username.toLowerCase().includes(keyword.toLowerCase()) ||
              chat.lastmessage.toLowerCase().includes(keyword.toLowerCase())
            ) {
              return chat;
            }
          })
          .map(chat => {
            return <ChatCard key={chat.username} chat={chat} />;
          })}
      </View>
    </ScrollView>
  );
};

export default All_Chats;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 3,
  },

  gohomeicon: {
    position: 'absolute',
    top: 15,
    left: 20,
    zIndex: 10,
  },
  c1: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    backgroundColor: '#111111',
    alignSelf: 'center',
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 1,
  },
  searchbar: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingLeft: 20,
    marginTop: 10,
    fontSize: 18,
  },
  c2: {
    width: '100%',
    padding: 10,
  },
});

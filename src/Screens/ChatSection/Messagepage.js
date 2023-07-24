import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import nopic from '../../../assets/user.png';
import {goback} from '../../Commoncss/pagecss';
import {io} from 'socket.io-client';

const socket = io('http://192.168.0.106:8001');

const Messagepage = ({navigation, route}) => {
  const {fuseremail, fuserid} = route.params;
  const [ouruserdata, setOuruserdata] = useState(null);
  const [fuserdata, setFuserdata] = useState(null);
  const [roomid, setRoomid] = useState(null);
  const [chat, setChat] = useState([]);
  // const [enablesendbutton, setEnablesendbutton] = useState(false);

  useEffect(() => {
    loaddata();
  }, []);
  useEffect(() => {
    socket.on('recieve_message', data => {
      console.log('recieved message is', data);
      loadMessages(roomid);
    });
  }, [socket]); //When socket changes, it updates it.,When we send signal, we will use socket.emit,  and we want to receive signal, we will use socket.on

  //here we make roomid with sorting
  const sortroomid = (id1, id2) => {
    if (id1 > id2) {
      return id1 + id2;
    } else {
      return id2 + id1;
    }
  };
  const loaddata = async () => {
    AsyncStorage.getItem('user')
      .then(async value => {
        // console.log('async user data', value);
        // setUserdata(JSON.parse(data));
        fetch('http://192.168.0.106:8000/userdata', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + JSON.parse(value).token,
          },
          body: JSON.stringify({
            email: JSON.parse(value).user.email,
          }),
        })
          .then(res => res.json())
          .then(async data => {
            if (data.message == 'User found') {
              setOuruserdata(data.user);
              console.log('our user data', data.user.username);

              fetch('http://192.168.0.106:8000/otheruserdata', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: fuseremail}),
              })
                .then(res => res.json())
                .then(async data1 => {
                  if (data1.message == 'User found') {
                    setFuserdata(data1.user);
                    let temproomid = await sortroomid(fuserid, data.user._id);
                    setRoomid(temproomid);
                    console.log('temproom', temproomid);

                    //socket.emmit is used to fire from frontend and go to backend

                    socket.emit('join_room', {roomid: temproomid});

                    //load message shows past chats
                    loadMessages(temproomid);
                  } else {
                    Alert.alert('User not Found');
                    navigation.navigate('SearchUserPage');
                  }
                })
                .catch(err => {
                  Alert.alert(`${err}`);
                  navigation.navigate('SearchUserPage');
                });
            } else {
              Alert.alert('SOmething went wrong, Login again');
              navigation.navigate('Login');
            }
          })
          .catch(err => {
            console.log('The error is: ', err);
            navigation.navigate('Login');
          });
      })
      .catch(err => console.log(err));
  };
  const [currentmessage, setCurrentmessage] = useState('');
  const sendmessage = async () => {
    const messagedata = {
      message: currentmessage,
      roomid: roomid,
      senderid: ouruserdata._id,
      recieverid: fuserdata._id,
    };

    fetch('http://192.168.0.106:8000/savemessagetodb', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(messagedata),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'Message sent successfully') {
          setCurrentmessage('');
          // setEnablesendbutton(flase);
          Alert.alert('Message Sent');
          console.log('message saved successfull'); // first we have save message in database
          socket.emit('send_message', messagedata); // then we have refreshed message in database
          loadMessages(roomid);
          console.log(messagedata);
        } else {
          setCurrentmessage('');
          // setEnablesendbutton(flase);
          Alert.alert('Something went wrong');
        }
      })
      .catch(err => {
        Alert.alert('Error in server sid');
      });
  };

  const loadMessages = async () => {
    fetch('http://192.168.0.106:8000/getmessages', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({roomid: roomid}),
    })
      .then(res => res.json())
      .then(data => {
        setChat(data); // we call this loadmessages function many in data changes, so we can see refreshed message.
        console.log('previous messages', data);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.s1}>
        <TouchableOpacity onPress={() => navigation.navigate('All_Chats')}>
          <Image
            source={require('../../../assets/back.png')}
            style={{
              width: 30,
              height: 30,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        {/* If data is loading in useEffect, & in useEffect you are providing setFuserdata(data), and same time if you want to render fuserdata, you should user,  */}
        {fuserdata?.profilepic ? (
          <Image
            source={{uri: fuserdata?.profilepic}}
            style={styles.profilepic}></Image>
        ) : (
          <Image source={nopic} style={styles.profilepic}></Image>
        )}
        <Text style={styles.username}> {fuserdata?.username}</Text>
      </View>
      <ScrollView style={styles.messageView}>
        {
          //we will map chat's array
          chat.map((item, index) => {
            return (
              <View style={styles.message} key={index}>
                {item.senderid == ouruserdata?._id && (
                  <View style={styles.messageright}>
                    <Text style={styles.messageTextRight}> {item.message}</Text>
                  </View>
                )}
                {item.senderid == fuserid && (
                  <View style={styles.messageLeft}>
                    <Text style={styles.messageTextLeft}> {item.message}</Text>
                  </View>
                )}
              </View>
            );
          })
        }
      </ScrollView>
      <View style={styles.sbottom}>
        <TextInput
          style={styles.sbottominput}
          placeholder="type a message"
          placeholderTextColor={'grey'}
          onChangeText={text => {
            setCurrentmessage(text);
            // setEnablesendbutton(true);

            // if (text == '') {
            //   setEnablesendbutton(false);
            // }
          }}
          value={currentmessage}
        />

        <TouchableOpacity
          style={styles.sbottombutton}
          onPress={() => sendmessage()}>
          <Text style={{color: 'white', fontSize: 20}}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Messagepage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  profilepic: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginLeft: 10,
  },
  username: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  s1: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    padding: 10,
    marginVertical: 5,
  },
  sbottom: {
    width: '100%',
    height: 50,
    backgroundColor: '#111111',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  sbottominput: {
    padding: 5,
    color: 'white',
  },
  message: {
    width: '100%',
    borderRadius: 10,
  },
  messageView: {
    width: '100%',
    borderRadius: 50,
  },
  messageright: {
    width: '100%',
    alignItems: 'flex-end',
  },
  messageLeft: {
    width: '100%',
    alignItems: 'flex-start',
  },
  messageTextRight: {
    color: 'white',
    backgroundColor: '#1e90ff',
    minWidth: 100,
    padding: 10,
    fontSize: 17,
    borderRadius: 20,
    margin: 10,
  },
  messageTextLeft: {
    color: 'white',
    backgroundColor: '#222222',
    minWidth: 100,
    padding: 10,
    fontSize: 17,
    borderRadius: 20,
    margin: 10,
  },
});

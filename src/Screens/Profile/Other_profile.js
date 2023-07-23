import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {containerFull} from '../../Commoncss/pagecss';
import {formHead} from '../../Commoncss/formcss';
import Bottomnavbar from '../../Components/Bottomnavbar';
import TopNavbar from '../../Components/TopNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Followers_RandomPost from '../../Components/Followers_RandomPost';
import nopic from '../../../assets/user.png';

const Other_profile = ({navigation, route}) => {
  const [userdata, setUserdata] = useState(null);
  const {user} = route.params;
  const loadata = async () => {
    fetch('http://192.168.0.106:8000/otheruserdata', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: user.email}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'User found') {
          setUserdata(data.user);
          ismyprofile(data.user);
          CheckFollow(data.user);
        } else {
          Alert.alert('User not Found');
          navigation.navigate('SearchUserPage');
        }
      })
      .catch(err => {
        Alert.alert(`Something went wrong`);
        navigation.navigate('SearchUserPage');
      });
  };
  useEffect(() => {
    loadata();
  }, []);

  //check my profile
  const [issameuser, setIssameuser] = useState(false);
  const ismyprofile = async otherprofile => {
    AsyncStorage.getItem('user').then(loggeduser => {
      const loggeduserobj = JSON.parse(loggeduser);
      // console.log('logged user', loggeduserobj);
      // console.log('other user', otherprofile);
      if (loggeduserobj.user.email == otherprofile.email) {
        setIssameuser(true);
        console.log('same user');
      } //convert string data to object
      else {
        setIssameuser(false);
        console.log('not same user');
      }
    });
  };

  //Check follow or unfollow
  const [isfollowing, setIsfollowing] = useState();

  const CheckFollow = otherprofile => {
    AsyncStorage.getItem('user')
      .then(loggeduser => {
        const loggeduserobj = JSON.parse(loggeduser);

        fetch('http://192.168.0.106:8000/checkfollower', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            followfrom: loggeduserobj.user.email,
            followto: otherprofile.email,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'User in following list') {
              setIsfollowing(true);
              console.log('you are following each other');
            } else if (data.message == 'User not in following list') {
              setIsfollowing(false);
              console.log('you are not following each other');
            } else {
              Alert.alert(data.error);
            }
          });
      })
      .catch(err => Alert.alert('async failed'));
  };

  //Folllow this user
  const followThisUser = async otherprofile => {
    console.log('follow this user', otherprofile);
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserobj = JSON.parse(loggeduser);

    fetch('http://192.168.0.106:8000/followuser', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        followfrom: loggeduserobj.user.email,
        followto: otherprofile.email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'User Following') {
          Alert.alert('Following');
          setIsfollowing(true);
          loadata();
        } else if (
          data.message == "other user's profile says: you are already following"
        ) {
          Alert.alert("You are already in user's follower list");
        } else {
          Alert.alert(data.error);
        }
      })
      .catch(err => Alert.alert('not fetching data'));
  };
  //Unfollow this user

  const unfollowThisUser = async otherprofile => {
    console.log('follow this user', otherprofile);
    const loggeduser = await AsyncStorage.getItem('user');
    const loggeduserobj = JSON.parse(loggeduser);

    fetch('http://192.168.0.106:8000/unfollowuser', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        followfrom: loggeduserobj.user.email,
        followto: otherprofile.email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message == 'Now You are Unfollowing') {
          Alert.alert('Unfollowed');
          setIsfollowing(false);
          loadata();
        } else if (data.message == "You are not in it's follower's profile") {
          Alert.alert("You are not in it's follower's profile");
        } else {
          Alert.alert(data.error);
        }
      })
      .catch(err => Alert.alert('not fetching data'));
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavbar navigation={navigation} page={'Other_profile'} />
      <Bottomnavbar navigation={navigation} page={'SearchUserPage'} />
      <Text style={styles.refresh} onPress={() => loadata()}>
        REFRESH
      </Text>

      {userdata ? (
        <ScrollView>
          <View style={styles.c1}>
            {userdata.profilepic.length > 0 ? (
              <Image
                style={styles.profile_pic}
                source={{uri: userdata.profilepic}}
              />
            ) : (
              <Image style={styles.profile_pic} source={nopic} />
            )}
            <Text style={styles.txt}> @{userdata.username}</Text>

            {!issameuser && (
              <View style={styles.row}>
                {isfollowing ? (
                  <Text
                    style={styles.follow}
                    onPress={() => unfollowThisUser(userdata)}>
                    Unfollow
                  </Text>
                ) : (
                  <Text
                    style={styles.follow}
                    onPress={() => followThisUser(userdata)}>
                    Follow
                  </Text>
                )}
                <Text
                  style={styles.message}
                  onPress={() =>
                    navigation.navigate('Messagepage', {
                      fuseremail: userdata.email,
                    })
                  }>
                  Message
                </Text>
              </View>
            )}
            <View style={styles.c11}>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Followers</Text>
                <Text style={styles.txt2}>{userdata.followers.length}</Text>
              </View>
              <View style={styles.vr1}></View>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Following</Text>
                <Text style={styles.txt2}>{userdata.following.length}</Text>
              </View>
              <View style={styles.vr1}></View>
              <View style={styles.c111}>
                <Text style={styles.txt1}>Posts</Text>
                <Text style={styles.txt2}>{userdata.posts.length}</Text>
              </View>
            </View>
            {userdata.description.length > 0 && (
              <Text style={styles.description}>{userdata.description}</Text>
            )}
          </View>
          {isfollowing || issameuser ? (
            <>
              {userdata.posts.length > 0 ? (
                <View style={styles.c1}>
                  <Text style={styles.txt}>post</Text>
                  <View style={styles.c13}>
                    {userdata.posts.map((item, index) => {
                      return (
                        <Image
                          key={item.post}
                          style={styles.postpic}
                          source={{uri: item.post}}
                        />
                      );
                    })}
                  </View>
                </View>
              ) : (
                <View style={styles.c2}>
                  <Text style={styles.txt1}>User has Not Posted Anything</Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.c2}>
              <Text style={styles.txt1}>Follow to see the post</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="white" />
      )}
    </View>
  );
};

export default Other_profile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: 60,
  },
  c1: {
    width: '100%',
    alignItems: 'center',
  },
  profile_pic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#111111',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  txt1: {
    color: 'white',
    fontSize: 15,
  },
  txt2: {
    color: 'white',
    fontSize: 20,
  },
  c11: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  c111: {
    alignItems: 'center',
  },
  vr1: {
    width: 1,
    height: 50,
    backgroundColor: 'white',
  },
  description: {
    color: 'white',
    fontSize: 15,
    marginVertical: 10,
    backgroundColor: '#111111',
    width: '100%',
    padding: 10,
    paddingVertical: 20,
  },
  postpic: {
    width: '30%',
    height: 120,
    margin: 5,
  },

  c13: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },

  c2: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  refresh: {
    position: 'absolute',
    top: 80,
    right: 10,
    zIndex: 1,
    color: 'white',
    fontSize: 15,
  },
  follow: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#0AD6A0',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  message: {
    color: 'grey',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
  },
});

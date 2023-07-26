import {
  StyleSheet,
  Text,
  Image,
  View,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {icon1} from '../Commoncss/pagecss';
import nopic from '../../assets/user.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Post_Big_Card = ({
  username,
  profile_image,
  post_image,
  likes,
  comments,
  postowneremail,
}) => {
  // console.log(post_image, profile_image, username, likes, comments);

  const [isliked, setisliked] = useState(false);
  const [showcomments, setShowcomments] = useState(false);
  const [likeslength, setLikeslength] = useState(likes.length);

  useEffect(() => {
    loaddata();
  }, []);

  const loaddata = () => {
    AsyncStorage.getItem('user')
      .then(value => {
        fetch('http://192.168.0.106:8000/likecheck', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            likerEmail: JSON.parse(value).user.email,
            postOwnerEmail: postowneremail,
            postPhotoLink: post_image,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'User has liked this') {
              setisliked(true);
            } else if (data.message == 'User has not liked this') {
              setisliked(false);
            } else {
              Alert.alert(` not getting messages of data`);
            }
          })
          .catch(err => {
            Alert.alert(`error is : ${err}`);
          });
      })
      .catch(err => {
        Alert.alert(`async ${err}`);
      });
  };
  const like = () => {
    AsyncStorage.getItem('user')
      .then(value => {
        fetch('http://192.168.0.106:8000/like', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            likerEmail: JSON.parse(value).user.email,
            postOwnerEmail: postowneremail,
            postPhotoLink: post_image,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'User has liked this') {
              setLikeslength(data.likes.length);
              setisliked(true);
              loaddata();
            } else if (data.message == 'User has already liked this') {
              Alert.alert('You have already liked this');
            } else {
              Alert.alert(` not getting messages of data`);
            }
          })
          .catch(err => {
            Alert.alert(`error is : ${err}`);
          });
      })
      .catch(err => {
        Alert.alert(`async ${err}`);
      });
  };
  const dislike = () => {
    AsyncStorage.getItem('user')
      .then(value => {
        fetch('http://192.168.0.106:8000/dislike', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            likerEmail: JSON.parse(value).user.email,
            postOwnerEmail: postowneremail,
            postPhotoLink: post_image,
          }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.message == 'User has disliked this') {
              setLikeslength(data.likes.length);
              setisliked(false);
              loaddata();
            } else if (data.message == 'User has already disliked this') {
              Alert.alert('You have already disliked this');
            } else {
              Alert.alert(` not getting messages of data`);
            }
          })
          .catch(err => {
            Alert.alert(`error is : ${err}`);
          });
      })
      .catch(err => {
        Alert.alert(`async ${err}`);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.c1}>
        <Image source={{uri: profile_image}} style={styles.profilepic}></Image>
        <Text style={styles.username}>{username}</Text>
      </View>
      {post_image.length > 0 ? (
        <Image source={{uri: post_image}} style={styles.image} />
      ) : (
        <Image source={nopic} style={styles.image} />
      )}

      <View style={styles.s2}>
        {isliked ? (
          <View style={styles.s21}>
            <TouchableOpacity
              onPress={() => {
                dislike();
              }}>
              <Image
                source={require('../../assets/heart_selected.png')}
                style={icon1}
              />
            </TouchableOpacity>
            <Text style={styles.liked}>{likeslength}</Text>
          </View>
        ) : (
          <View style={styles.s21}>
            <TouchableOpacity
              onPress={() => {
                like();
              }}>
              <Image source={require('../../assets/heart.png')} style={icon1} />
            </TouchableOpacity>
            <Text style={styles.notliked}>{likeslength}</Text>
          </View>
        )}
        <View style={styles.s22}>
          <TouchableOpacity
            onPress={() => {
              setShowcomments(!showcomments);
            }}>
            <Image source={require('../../assets/message.png')} style={icon1} />
          </TouchableOpacity>
        </View>
      </View>

      {showcomments == true && (
        <View style={styles.s3}>
          {comments.map((item, index) => {
            return (
              <View style={styles.s31} key={item.id}>
                <Text style={styles.commentuser}>{item.username}</Text>
                <Text style={styles.commenttext}>{item.comment}</Text>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default Post_Big_Card;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  c1: {
    flexDirection: 'row',
    width: '100%',
    // height: 500,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'black',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  profilepic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
  },
  username: {
    color: 'white',
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },

  image: {
    width: '100%',
    aspectRatio: 1,
  },
  s2: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 10,
    alignItems: 'center',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  s21: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notliked: {
    color: 'grey',
    marginLeft: 5,
    fontSize: 25,
  },
  liked: {
    color: 'pink',
    marginLeft: 5,
    fontSize: 25,
  },
  s22: {
    marginLeft: 20,
  },
  s3: {
    width: '100%',
    backgroundColor: '#111111',
    padding: 10,
  },
  commentuser: {color: 'white', fontWeight: 'bold', fontSize: 17},
  commenttext: {color: 'grey', marginLeft: 5, fontSize: 17},
  s31: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
});

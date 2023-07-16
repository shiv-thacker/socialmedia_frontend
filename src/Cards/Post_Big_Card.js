import {
  StyleSheet,
  Text,
  Image,
  View,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {icon1} from '../Commoncss/pagecss';

const Post_Big_Card = ({
  username,
  profile_image,
  post_image,
  likes,
  comments,
}) => {
  // console.log(post_image, profile_image, username, likes, comments);
  console.log(comments);
  const [isliked, setisliked] = useState(false);
  const [showcomments, setShowcomments] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.c1}>
        <Image source={{uri: profile_image}} style={styles.profilepic}></Image>
        <Text style={styles.username}>{username}</Text>
      </View>
      <Image source={{uri: post_image}} style={styles.image} />
      <View style={styles.s2}>
        {isliked ? (
          <View style={styles.s21}>
            <TouchableOpacity
              onPress={() => {
                setisliked(!isliked);
              }}>
              <Image
                source={require('../../assets/heart_selected.png')}
                style={icon1}
              />
            </TouchableOpacity>
            <Text style={styles.liked}>{likes.length + 1}</Text>
          </View>
        ) : (
          <View style={styles.s21}>
            <TouchableOpacity
              onPress={() => {
                setisliked(!isliked);
              }}>
              <Image source={require('../../assets/heart.png')} style={icon1} />
            </TouchableOpacity>
            <Text style={styles.notliked}>{likes.length}</Text>
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

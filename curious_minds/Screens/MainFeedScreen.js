import 'react-native-gesture-handler';
import React, {Component, useState, useCallback, useRef} from 'react';
import {Card} from 'react-native-shadow-cards';
import {Button} from 'react-native-vector-icons/FontAwesome';
import { db } from '../FireDatabase/config';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Modal,
  ScrollView,
  RefreshControl,
  Alert,
  LayoutAnimation,
} from 'react-native';

var state = {
  posts: [],
  display: [],
  Loading: true,
};

const delay = ms => new Promise(res=>setTimeout(res,ms));

async function readFromDB(){
  state.Loading = true;
  await db.ref('/posts/').once('value', function(snapshot){
    let postItems = [];
    snapshot.forEach((child) => {
      postItems.push({
        question: child.val().question,
        desc: child.val().desc,
        anon: child.val().Anon,
        pastorOnly: child.val().PastorOnly
      });
    })
    state.posts = postItems.reverse();
  });
  await loadPostCards();
}

async function loadPostCards(){
  state.display = state.posts.map(postData => {
    return(
      <View key={postData.question}>
        <Card style={{ padding: 15, margin:5, alignSelf: 'center'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>{postData.question}</Text>
            <Text style={{marginTop: 3}}>{postData.desc}</Text>
            {/* //This needs to be fixed */}
            <Text style={{alignSelf: 'flex-end', opacity: 0.5}}>Posted by: {postData.Anon} on DATE HERE</Text>
            <View style={{flexDirection:'row', alignItems: 'stretch'}}>
              <Button
                style={{backgroundColor: 'white'}}
                color='black'
                name='comment'
                onPress={()=> Alert.alert('Comment')} />
              <Button
                style={{backgroundColor: 'white'}}
                color='black'
                name='language'
                onPress={()=> Alert.alert('Translate')} />
              <Button
                style={{backgroundColor: 'white'}}
                color='black'
                name='thumbs-up'
                onPress={()=> Alert.alert('Like')} />
              <Button
                style={{backgroundColor: 'white'}}
                color='black'
                name='exclamation-triangle'
                onPress={()=> Alert.alert('Report')} />
          </View>
        </Card>
      </View>
    )
  });
  state.Loading = false;
}

function MainFeedScreen({navigation}) {
    const [isLoading, setLoading]= useState(true);
    const onRefresh = useCallback(() => {
      setLoading(true);
      delay(2000).then(()=> setLoading(false))}, [isLoading]
    );
    readFromDB();
    LayoutAnimation.easeInEaseOut();
    return (
      setTimeout(()=> setLoading(state.Loading), 500),
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={styles.container}>
            {state.display}
          </View>
          {/* <Modal
           transparent={true}
           animationType={'none'}
           visible={isLoading}
          >
            <ActivityIndicator size="large" color="black" style={{flex: 1}}/>
          </Modal> */}
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
  },
  logo: {
    margin: 100,
  },
  overlay: {
    // flex:1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
    // opacity: 0.1,
    // backgroundColor: '#696969',
  },
  inputBox: {
    alignItems:'stretch',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    textAlign: 'left',
    padding: 10,
    margin: 15,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 3, width: 3}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderColor: 'white',
    borderRadius: 15,
    height: 40,
    marginHorizontal: 15,
  },
  multiline: {
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'stretch',
    height: 150,
    textAlign: 'left',
    margin: 15,
  },
  customBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
  footer: {
    bottom: 0,
  },
});

export default MainFeedScreen;

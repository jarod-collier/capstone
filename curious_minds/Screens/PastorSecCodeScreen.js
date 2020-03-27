import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { db } from '../FireDatabase/config';
import firebase from 'firebase';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  LayoutAnimation,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

var state = {
  Code: "",
};
const handleCode = text => {
  state.Code = text;
};

async function readFromDB(){
  var found = false;
  await db.ref('/userInfo/').once('value', function(snapshot){
    snapshot.forEach((child) => {
      if(child.val().userType === 'pastor'){
        console.log(child.val().pastorCode);
        console.log(state.Code);
        if(child.val().pastorCode === state.Code){
          console.log('found it');
          found = true;
        }
      }
    })
  });
  return found;
}

async function validateCode(navigation){
  console.log('b4 DB');
  var valid = await readFromDB();
  console.log('after DB');
  console.log(valid);
  if(valid){
    navigation.navigate('Pastor SignUp');
  }else{
    Alert.alert('Not a valid security code.\nPlease try again.');
  }
}

function PastorSecCodeScreen({navigation}) {
  LayoutAnimation.easeInEaseOut();
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
       resetScrollToCoords={{x: 0, y: 0}}
       contentContainerStyle={styles.container}
       scrollEnabled={false}
       extraHeight={100}
       >
          <View style={styles.logo}>
            <Image source={require('../images/CM_logo02.png')} />
          </View>
          <View>
            <Text style={styles.securityCodeText}>Pastors{"\n"}Security Code</Text>
          </View>
          <View style = {{alignItems: 'center'}}>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter Code Here"
              placeholderTextColor="white"
              onChangeText={handleCode}
            />
            <TouchableOpacity
              style={styles.Buttons}
              onPress={() => validateCode(navigation)}>
              <Text style={styles.customBtnText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#696969',
    alignItems: 'center',
  },
  logo: {
    margin: 100,
  },
  inputBox: {
    //borderRadius: 30,
    //borderColor: 'white',
    //borderWidth: 1,
    borderBottomWidth: 1.0,
    width: 250,
    textAlign: 'center',
    marginTop: 50,
  },
  Buttons: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 5, width: 5}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 4, // Android
    borderWidth: 1,
    backgroundColor: 'dodgerblue',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: 'white',
    borderRadius: 25,
    width: 150,
    //margin: 10,
    marginTop: 25,
  },
  customBtnText: {
    fontSize: 35,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
  securityCodeText: {
    fontSize: 35,
    fontWeight: '400',
    color: "white",
    textAlign: "center"
  },
});

export default PastorSecCodeScreen;

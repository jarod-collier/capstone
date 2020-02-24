import 'react-native-gesture-handler';
import React, {Component, useState} from 'react';
import {CheckBox} from 'react-native-elements';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';



this.state = {
    checked: {},
    Question: '',
    Description: '',
    Anon: false,
    pastorOnly: false,
  };

  

this.handleQuestion = text => {
    this.state.Question = text;
};

this.handleDescription = text => {
    this.state.Description = text;
};

const handleOptionAnon = Boolean=> {
    this.state.Anon = Boolean;
    console.log(""+this.state.Anon);
};

this.handleOptionPastorOnly = Boolean => {
    this.state.pastorOnly = Boolean;
};

function NewPostScreen({navigation}) {
  const [Anon, setAnon] = useState(false);
  const [pastorOnly, setPastorOnly] = useState(false);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View>
          <Text style={
            {
              marginTop: 40,
              marginLeft: 15,
              fontSize: 24,
            }}>
            Your Question
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Type your question here"
            placeholderTextColor="white"
            onChangeText={this.handleQuestion}
          />
        </View>
        <View>
          <Text style={
            {
              marginTop: 20,
              marginLeft: 15,
              fontSize: 24,
            }}>
              Description
          </Text>
          <TextInput
            style={styles.multiline}
            placeholder="Type your description here"
            placeholderTextColor="white"
            multiline={true}
            numberOfLines={10}
            onChangeText={this.handleDescription}
          />
        </View>
        <View>
          <Text style={
            {
              marginTop: 20,
              marginLeft: 15,
              fontSize: 24,
            }}>
              Attachment:
          </Text>      
        </View>
        <View>
          <Text style={
            {
              marginTop: 20,
              marginLeft: 15,
              fontSize: 24,
            }}>
              Options:
          </Text> 
          <View style={{ flexDirection: 'row'}}>
            <CheckBox
              checked={Anon}
              onPress={()=> {this.handleOptionAnon(!Anon); setAnon(!Anon)}} 
            />
            <Text style={{marginTop: 15, fontSize: 18}}>post anonymous</Text>
          </View>
          <View style={{ flexDirection: 'row'}}>
            <CheckBox
              checked={pastorOnly}
              onPress={() => {this.handleOptionPastorOnly(!pastorOnly); setPastorOnly(!pastorOnly)}}
            /> 
            <Text style={{marginTop: 15, fontSize: 18}}>only pastor response</Text>
          </View>
        </View>
        <View 
        // style={styles.footer}
        >
          <TouchableOpacity
            style={styles.Buttons}
            // onPress={() => }
            >
            <Text style={styles.customBtnText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
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

export default NewPostScreen;

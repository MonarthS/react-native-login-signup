// import EnterName from './App/Components/EnterName

import React from 'react';
import {AppRegistry,
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  Dimensions
} from  'react-native';

const signupImg = require('../images/signup.png');

const win = Dimensions.get('window');
const ratio = win.width/603; //603 is actual image width

// import { requireNativeViewManager } from 'expo-core';
const axios = require('axios').default;


// components import
// import  FbSignUp  from './FbSignUp';
// import  GoogleSignUp  from './GoogleSignUp';
// import SignupInputs from './SignupInputs';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onPressLearnMore=this.onPressLearnMore.bind(this);
    this.state = { isShowingLoader: false, username: '', email: '', password:'' };
}
onPressLearnMore() {
}

callSignup = async () => {

    console.log(this.state.username)
    console.log(this.state.email)
    console.log(this.state.password)

    if(this.state.username && this.state.email && this.state.password) {
        this.setState({isShowingLoader: true});
        
        try{
            let dop = await axios.post('https://register-auth-project.herokuapp.com/register', {
                name: this.state.username,
                email: this.state.email,
                pass: this.state.password
            });
            console.log(dop.data);
            Alert.alert(
                'Message',
                dop.data.data,
                [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            )
            this.setState({isShowingLoader: false});
        } catch (error) {
            console.log(error);
            this.setState({isShowingLoader: false});
            Alert.alert(
                'Error',
                'Something went wrong!',
                [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            )
        }
    } else {
        Alert.alert(
            'Error',
            'Please enter required fields!',
            [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        )
    }

}




  render() {
      return (
        <View>        
      <KeyboardAvoidingView behavior="position">

        <View style={{marginTop:50,marginLeft:'auto',marginRight:'auto'}}>
            <Image
                style = {{ width: win.width, height: 166 * ratio }}
                source={signupImg}
            />
         {/* <Text style={{fontSize:20,fontWeight:'bold'}}>
         Register
         </Text> */}
         </View>
        
       {/* <FbSignUp />
        <GoogleSignUp /> */}
        
        {/* <View style = {style.center}>
                <Text>
                or
                </Text>
            </View>

            <View style={style.center}>
                <Text>
                Signup With Email
                </Text>
            </View> */}
       

            <View>
                <TextInput onChangeText={(username) => this.setState({username})} style={style.inputs} placeholder = "Enter Username "/>
            </View>

            <View>
                <TextInput onChangeText={(email) => this.setState({email})} style={style.inputs} placeholder = "Enter email"/>
            </View>

            <View>
                <TextInput onChangeText={(password) => this.setState({password})} secureTextEntry={true}
                style={style.inputs} placeholder = "Set your Password" />
            </View>

          {/* own buttons design */}
           <View style={[style.center,{marginTop:20}]}>
            { !this.state.isShowingLoader &&
            <TouchableOpacity onPress={this.callSignup}>
            <Text style = {style.textButton}>
               Signup
            </Text> 
         </TouchableOpacity> }
         { this.state.isShowingLoader && <ActivityIndicator size='large' /> }
        </View>

        <View style={style.center}>
                <TouchableOpacity>
                <Text style={{textAlign:'center',padding:20,margin:10}}
                  onPress={this.props.onPressAlreadyReg}>
                Already registered ?
                </Text>
                </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
        </View> 
      );
    }
  }
  const style = StyleSheet.create( {
    inputs: {
      marginTop:50,
      fontSize:20,
      marginLeft:10,
      marginRight:10,
      borderBottomColor:'red',
      borderBottomWidth:2, 
    },
    title:{
      color:'red',
      textAlign:'center',
      marginTop:50,
      fontSize:30,
      fontWeight:'bold'
    },
    center: {
      marginLeft:'auto',
      marginRight:'auto',
    },  
    textButton: {
      width:140,
      padding:10,
      fontSize:20,
      marginLeft:10,
      fontWeight:'bold',
      borderRadius:30,
      color:'white',
      textAlign:'center',
      backgroundColor: 'green',
    },
})
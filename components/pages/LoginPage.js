// import EnterName from './App/Components/EnterName
import React from 'react';
import {AppRegistry,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Image,
  Dimensions,
} from  'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const unlockImg = require('../images/unlock.png');
const loginImg = require('../images/login.png');

// import { requireNativeViewManager } from 'expo-core';
const axios = require('axios').default;

var LocalAuth = require('react-native-local-auth')



// components import
// import  FbLogin  from './FbLogin';
// import  GoogleLogin  from './GoogleLogin';
// import LoginInputs from './LoginInputs';

const win = Dimensions.get('window');
const ratio = win.width/603; //603 is actual image width



export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.onPressLearnMore=this.onPressLearnMore.bind(this);
    this.state = { isShowingLoader: false, username: '', password:'', isShowingWelcome: false };

}



UNSAFE_componentWillMount() {
  (async ()=>{
    console.log('here checking')
    let userId = await AsyncStorage.getItem("userId");
    console.log(userId);
    console.log('here checking')
    if(userId){
      console.log('here')
      //redirect to welcome
      this.setState({isShowingWelcome:true});
    }
    else {
      // on begining showing signup page
      this.setState({isShowingWelcome:false});
    }
  })()
}



onPressLearnMore() {
}

callSignin = async () => {

    console.log(this.state.username)
    console.log(this.state.password)

    if(this.state.username && this.state.password) {
        this.setState({isShowingLoader: true});
        
        try{
            let dop = await axios.post('https://register-auth-project.herokuapp.com/signin12', {
                your_name: this.state.username,
                your_pass: this.state.password
            });
            console.log(dop.data);

            if(dop.data.msg == 'success') {

              console.log(this.state.username)

              try{

                 AsyncStorage.setItem(
                  'userId', this.state.username
                );

                console.log('setting item');
                console.log(await AsyncStorage.getItem("userId"));
                console.log('setting item');
              } catch(e) {
                console.log('error in save')
              }


                LocalAuth.authenticate({
                    reason: 'This is a secure area, please authenticate yourself',
                    fallbackToPasscode: true,    // fallback to passcode on cancel
                    suppressEnterPassword: true // disallow Enter Password fallback
                })
                .then(success => {
                    console.log('Authenticated Successfully')
                    Alert.alert(
                    'Auth Check',
                    'Login Successfull',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                    );
                    this.setState({isShowingWelcome: true});


                })
                .catch(error => {
                    console.log('Authentication Failed', error.message)
                    if(error.message == 'User canceled') {
                        Alert.alert(
                            'Message',
                            'Please validate PIN / Pattern / Fingerprint',
                            [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: false},
                        );
                    } else {
                        this.setState({isShowingWelcome: true});
                        console.log('No Auth found');
                        // Alert.alert(
                        //     'Auth Check',
                        //     'No Auth found',
                        //     [
                        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
                        //     ],
                        //     {cancelable: false},
                        // );
                    }
                })
    
            } else {
                Alert.alert(
                    'Message',
                    dop.data.data,
                    [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                )
            }

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

callSignout = () => {
    AsyncStorage.clear();
    this.setState({isShowingWelcome: false});
}

  render() {
      return (
        <View>   

        {!this.state.isShowingWelcome &&
              <KeyboardAvoidingView behavior = "position" disabled>

        <View style={{marginTop:50,marginLeft:'auto',marginRight:'auto'}}>
            <Image
                style = {{ width: win.width, height: 166 * ratio }}
                source={loginImg}
            />
         {/* <Text style={{fontSize:20,fontWeight:'bold'}}>
         Login
         </Text> */}
         </View>
        
       {/* <FbLogin />
        <GoogleLogin /> */}
        
        {/* <View style = {style.center}>
                <Text>
                or
                </Text>
            </View>

            <View style={style.center}>
                <Text>
                Login With Email.
                </Text>
            </View>
        */}
       
            <View>
                <TextInput onChangeText={(username) => this.setState({username})} style={style.inputs} placeholder = "Enter Username"/>
            </View>

            <View>
                <TextInput onChangeText={(password) => this.setState({password})} secureTextEntry={true}
                style={style.inputs} placeholder = "Enter Password"
                />
            </View>
        
        {/* <View>
          <Text style={{textAlign:'right',marginTop:10,marginRight:10}}
          onPress={this.props.onPressForgotPass}>
          Forgot Password? 
          </Text>
        </View>  */}

          {/* own buttons design */}
          <View style={[style.center,{marginTop:20}]}>
          { !this.state.isShowingLoader &&
            <TouchableOpacity onPress={this.callSignin}>
                <Text style = {style.textButton}>
                Login
                </Text>
            </TouchableOpacity> }
            { this.state.isShowingLoader && <ActivityIndicator size='large' /> }
         </View>

        <View style={style.center}>
                <TouchableOpacity>
                <Text style={{textAlign:'center',padding:20,margin:10}}
                  onPress={this.props.onPressCreateAcc}>
                create an Account ?
                </Text>
                </TouchableOpacity>
        </View>
          </KeyboardAvoidingView> }
          {this.state.isShowingWelcome &&
                        <KeyboardAvoidingView behavior = "position" disabled>
          <View style={[style.center,{marginBottom:20}]}>
            <Image
            style={{width: 66, height: 58}}
            source={unlockImg}
            />
            </View>
          <View style={[style.center,{marginBottom:20}]}>
            <Text style={{color: 'green'}}>
            Welcome!
            </Text>
          </View>
          <View style={[style.center,{marginTop:20}]}>
                <TouchableOpacity onPress={this.callSignout}>
                    <Text style = {style.textButton}>
                    Logout
                    </Text>
                </TouchableOpacity> 
            </View>
            </KeyboardAvoidingView>
          }

        </View> 
      );
    }
  }
  const style = StyleSheet.create( {
    inputs: {
      marginTop:50,
      color:'red',
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
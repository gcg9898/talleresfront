import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';


class InputLogin extends Component {
    constructor(props){
      super(props);
      
        this.id = props.id;
        this.secure = props.secure||false;
        this.onChange = props.onChange;
    }
    render(){
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent:'center'
        
      }}>
          <TextInput
           id = {this.id}
            secureTextEntry = {this.secure}
            onChangeText = {this.onChange}
            style={{ borderColor: 'gray', borderWidth: 2}}>
            </TextInput>
           
    
      </View>
    );
  }
}
  export default InputLogin;
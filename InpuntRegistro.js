import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';



class InputRegistro extends Component {
    constructor(props){
      super(props);
      
        this.id = props.id;
        this.secure = props.secure||false;
        this.onChange = props.onChange;
        this.placeholder=props.placeholder;
    }
    render(){
    return (
      <View style={{
        flexDirection: 'column',
        justifyContent:'center'
        
      }}>
        
       
   <TextInput
   placeholder={this.placeholder}
    id = {this.id}
     secureTextEntry = {this.secure}
     onChangeText = {this.onChange}
     style={{ borderColor: 'gray', borderWidth: 2,borderRadius:5,padding:3,margin:3}}>
     </TextInput>
       
      </View>
    );
  }
}
  export default InputRegistro;
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
        flexDirection: 'column',
        justifyContent:'center'
        
      }}>
        <View style={{margin:15}}>
        <Image source={require('./src/tallercoche-logotipo.png')} style={{width: "100%",height:45}} />
        </View>
     
        <View style={{padding:10}}>
        <Text >Usuario:</Text>
          <TextInput
          placeholder="Usuario"
           id = {this.id}
            secureTextEntry = {this.secure}
            onChangeText = {this.onChange}
            style={{ borderColor: 'gray', borderWidth: 2,borderRadius:5,padding:3,margin:3}}>
            </TextInput>
            </View>

            <View style={{padding:10}}>
            <Text>Contraseña:</Text>
            <TextInput
            placeholder="Contraseña"
           id = {"pass"}
            secureTextEntry = {true}
            onChangeText = {this.onChange}
            style={{ borderColor: 'gray', borderWidth: 2,borderRadius:5,padding:3,margin:3}}>
            </TextInput>
            </View>
    
      </View>
    );
  }
}
  export default InputLogin;
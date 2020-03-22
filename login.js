import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import {Component} from 'react';
import InputLogin from './InputLogin';

class Login extends Component{
  state = {
    user: "",
    password: "",
    error: null,
    sending: false,
  };
  onChangeEmail = user => this.setState({user});
  onChangePassword = password => this.setState({password});
  iniciarSesion = async (navigation) => {
    this.setState({sending: true});
    navigation.navigate("Ofertas");
  }
  registrar = async (navigation) => {
    navigation.navigate("Registro");
  }
  render(){
 
  
    return(
      <View style={{
        flexDirection: 'column',
        justifyContent:'center',

      
      }}>
        <View style={{flex: 3 }}></View>
        <View style={{flex: 1 }}>
      <InputLogin onChange= {this.onChangeEmail} id = {"name"} secure = {false}></InputLogin>
      <InputLogin onChange = {this.onChangePassword} id = {"pass"} secure = {true}></InputLogin>
      <Button 
      onPress = {()=>this.iniciarSesion(this.props.navigation)}
      title =  "Iniciar Sesion"
      color = "blue"  
      >
      </Button>
      <Button 
      onPress = {()=>this.registrar(this.props.navigation)}
      title =  "Registrarse"
      color = "blue"  
      >
      </Button>
      </View>
        <View style={{flex: 3 }}></View>
      </View>
    );
  }
}
export default Login;
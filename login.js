import React from 'react';
import { StyleSheet, Text, View ,Button,Image,FormLabel,TouchableOpacity} from 'react-native';
import {Component} from 'react';
import InputRegistro from './InpuntRegistro';

class Login extends Component{
  state = {
    user: "",
    password: "",
    error: null,
    sending: false,
  };
  onChangeUser = user => this.setState({user});
  onChangePassword = password => this.setState({password});
  iniciarSesion = async (navigation) => {
    this.setState({sending: true});
    fetch('http://192.168.0.160/backtalleres-master/login.php', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        nombre:this.state.user,
        pass:this.state.password
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        // If server response message same as Data Matched
      if(responseJson[0] == 'Login')
        {
          navigation.navigate("Index", {userKey:responseJson[1],coches:responseJson[2]});
        }
        else
        {
          console.log("Eror en login");
        }

      }).catch((error) => {
        console.error(error);
      }); 
  }
  registrar = async (navigation) => {
    navigation.navigate("Registro");
  }
  render(){
 
  
    return(
      <View style={{
        flexDirection: 'row',
        justifyContent:'center'
      }}>
      <View style={{
        flexDirection: 'column',
        justifyContent:'center',
      }}>
        
        <View style={{margin:15}}>
        <Image source={require('./src/tallercoche-logotipo.png')} style={{width: "100%",height:43}} />
      </View>
      <View style={{padding:5}}>
      <Text>Usuario</Text>
      <InputRegistro onChange= {this.onChangeUser} placeholder={"Usuario"} id = {"user"} secure = {false}></InputRegistro>
      </View>
       <View style={{padding:5}}>
       <Text>Contraseña</Text>
       <InputRegistro onChange= {this.onChangePassword} placeholder={"Usuario"} id = {"pass"} secure = {true}></InputRegistro>
       </View>
      <Button 
      style={{margin:10,borderRadius:50}}
      onPress = {()=>this.iniciarSesion(this.props.navigation)}
      title =  "Iniciar Sesion"
      color = "red"  >
      </Button>
      <TouchableOpacity 
      style={{margin:10}}
      onPress = {()=>this.registrar(this.props.navigation)}>
        <Text>Registro</Text>
      </TouchableOpacity>
      </View>
      </View>
     
    );
  }
}
export default Login;
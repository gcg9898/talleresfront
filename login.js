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
  onChangeUser = user => this.setState({user});
  onChangePassword = password => this.setState({password});
  iniciarSesion = async (navigation) => {
    this.setState({sending: true});
    fetch('http://192.168.1.53/login.php', {
      method: 'POST',
      headers: {
        
      },
      body: JSON.stringify({
    
        nombre:this.state.user,
        pass:this.state.password
    
      })
    
    }).then((response) => response.json())
      .then((responseJson) => {
        // If server response message same as Data Matched
      if(responseJson == 'Login')
        {
          console.log("hola");
            //Then open Profile activity and send user email to profile activity.
            navigation.navigate("Ofertas");
        }
        else{
        
          console.log("Eror en login");
        }

      }).catch((error) => {
        console.log("hola");
        console.error(error);
      });
    
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
      <InputLogin onChange= {this.onChangeUser} id = {"name"} secure = {false}></InputLogin>
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
      <Text>{this.state.user  +this.state.password }</Text>
      </View>
        <View style={{flex: 3 }}></View>
      </View>
    );
  }
}
export default Login;
import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
import {Component} from 'react';
import InputLogin from './InputLogin';


class Registro extends Component{
  state = {
    email: "",
    user: "",
    password: "",
    error: null,
    sending: false,
  };
  onChangeEmail = e => this.setState({email:e});
  onChangeUser = u => this.setState({user:u});
  onChangePassword = p => this.setState({password:p});
  
  registrar = async (navigation) => {
    this.setState({sending: true});
    
    fetch('http://192.168.1.53/registro.php', {
      method: 'POST',
      headers: {
        
      },
      body: JSON.stringify({
    
        email: this.state.email,
        user:this.state.user,
        password:this.state.password
    
      })
    
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.stringify());
        // If server response message same as Data Matched
      if(responseJson == 'El usuario ha sido creado')
        {

            //Then open Profile activity and send user email to profile activity.
            navigation.navigate("Login");
        }
        else{
         
          console.log("Eror en la creacion");
        }

      }).catch((error) => {
        console.log("hola");
        console.error(error);
      });
  }
  render(){
    return(
      <View style={{
        flexDirection: 'column',
        justifyContent:'center'
      }}>
        <View style={{flex: 3 }}></View>
        <View style={{flex: 1 }}>
      <InputLogin onChange= {this.onChangeEmail} id = {"email"} secure = {false}></InputLogin>
      <InputLogin onChange= {this.onChangeUser} id = {"user"} secure = {false}></InputLogin>
      <InputLogin onChange = {this.onChangePassword} id = {"password"} secure = {true}></InputLogin>
      <InputLogin  id = {"confirmpass"} secure = {true}></InputLogin>
      <Button 
      onPress = {()=>this.registrar(this.props.navigation)}
      title =  "Registrarse"
      color = "blue"  
      >
      </Button>
      <Text>{this.state.user + this.state.email +this.state.password }</Text>
      </View>
        <View style={{flex: 3 }}></View>
      </View>
    );
  }
}
export default Registro;
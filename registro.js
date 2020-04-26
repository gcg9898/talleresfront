import React from 'react';
import { StyleSheet, Text, View ,Button,Image} from 'react-native';
import {Component} from 'react';

import InputRegistro from './InpuntRegistro';


class Registro extends Component{
  state = {
    email: "",
    user: "",
    password: "",
    placeholder:"",
    error: null,
    sending: false,
    flagUser:true,
    flagPassword:true,
    flagEmail:true
  };
  onChangeEmail = e => this.setState({email:e});
  onChangeUser = u => this.setState({user:u});
  onChangePassword = p => this.setState({password:p});
  
  registrar = async (navigation) => {
    this.setState({sending: true});
    if(this.state.user.length>0&&this.state.password.length>0&&this.state.email.length>0){
    fetch('https://tallercoche.es/backtalleres-master/registro.php', {
      method: 'POST',
      headers: {
        
      },
      body: JSON.stringify({
    
        email: this.state.email,
        user:this.state.user,
        password:this.state.password,
        placeholder:this.state.placeholder,
        flagUser:this.state.flagUser,
    flagPassword:this.state.flagPassword,
    flagEmail:this.state.flagEmail
      })
    
    }).then((response) => response.json())
      .then((responseJson) => {
        // If server response message same as Data Matched
      if(responseJson == 'El usuario ha sido creado')
        {
            navigation.navigate("Login");
        }
        else
        {
          console.log("Eror en la creacion");
        }

      }).catch((error) => {
        console.error(error);
      });
    }else{
      if(this.state.user.length==0){
        this.setState({flagUser:false});
      }else
        this.setState({flagUser:true});

      if(this.state.password.length==0){
        this.setState({flagPassword:false});
      }else
       this.setState({flagPassword:true});

      if(this.state.email.length==0){
        this.setState({flagEmail:false});
      }else
        this.setState({flagEmail:true});
    }
      
  }
  render(){
    const flagUser=this.state.flagUser;
    const flagPassword=this.state.flagPassword;
    const flagEmail=this.state.flagEmail;
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
      <Text>Email</Text>
      <InputRegistro onChange= {this.onChangeEmail} flag={flagEmail} placeholder={"Email"} id = {"email"} secure = {false}></InputRegistro>
      </View>
      <View style={{padding:5}}>
      <Text>Usuario</Text>
      <InputRegistro onChange= {this.onChangeUser} flag={flagUser} placeholder={"Usuario"} id = {"user"} secure = {false}></InputRegistro>
      </View>
      <View style={{padding:5}}>
      <Text>Contraseña</Text>
      <InputRegistro onChange = {this.onChangePassword} flag={flagPassword} placeholder={"Contraseña"} id = {"password"} secure = {true}></InputRegistro>
      </View>
      <View style={{padding:5}}>
      <Text>Confirmar Contraseña</Text>
      <InputRegistro  flag={flagPassword} placeholder={"Confirmar Contraseña"} id = {"confirmpass"} secure = {true}></InputRegistro>
      </View>
      <View style={{margin:5}}>
      <Button 
      onPress = {()=>this.registrar(this.props.navigation)}
      title =  "Registrarse"
      color = "red"  
      >
      </Button>
      </View>
      </View>
      </View>
    );
  }
}
export default Registro;
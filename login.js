import React from 'react';
import {Text, View ,Button,Image,FormLabel,TouchableOpacity} from 'react-native';
import {Component} from 'react';
import InputRegistro from './InpuntRegistro';

class Login extends Component{
  state = {
    user: "",
    password: "",
    error: null,
    sending: false,
    flagUser:true,
    flagPassword:true
  };

  componentDidMount(){
    this.setState({flagPassword:true});
  }
  onChangeUser = user => this.setState({user});
  onChangePassword = password => this.setState({password});
  iniciarSesion = async (navigation) => {
    this.setState({sending: true});
    fetch('https://tallercoche.es/backtalleres-master/login.php', {
      method: 'POST',
      headers: {},
      body: JSON.stringify({
        nombre:this.state.user,
        pass:this.state.password,
        flagUser:this.state.flagUser,
        flagPassword:this.state.flagPassword,
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
          if(this.state.user.length==0){
            this.setState({flagUser:false});
          }
          if(this.state.password.length==0){
            this.setState({flagPassword:false});
          }

          console.log("Eror en login");
        }

      }).catch((error) => {
        console.error(error);
      }); 
  }
  registrar = async (navigation) => {
    this.setState({flagUser:true});
    this.setState({flagPassword:true});
    navigation.navigate("Registro");
  }
  render(){
    const flagUser=this.state.flagUser;
    const flagPassword=this.state.flagPassword;

    return(
      <View style={{
        flexDirection: 'row',
        justifyContent:'center',
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
      <InputRegistro onChange= {this.onChangeUser} flag={flagUser} placeholder={"Usuario"} id = {"user"} secure = {false}></InputRegistro>
      </View>
       <View style={{padding:5}}>
       <Text>Contraseña</Text>
       <InputRegistro onChange= {this.onChangePassword} flag={flagPassword} placeholder={"Contraseña"} id = {"pass"} secure = {true}></InputRegistro>
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
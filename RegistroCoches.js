import React from 'react';
import { StyleSheet, Text, View ,Button,Image,FormLabel,TouchableOpacity} from 'react-native';
import {Component} from 'react';
import InputRegistro from './InpuntRegistro';
import { red } from 'color-name';

class RegistroCoches extends React.Component 
{
   
  state = {
      userKey:this.props.navigation.state.params.userKey,
      coches:this.props.navigation.state.params.coches,
      nombre:"",
      marca:"",
      tipo:"",
      error: null,
      sending: false,
      click: null,
    };

  setCoches = c => this.setState({coches:c});
  setUserKey = d => this.setState({user_key:d});
  setClick = e => this.setState({click:e});

  onChangeNombre = nombre => this.setState({nombre:nombre});
  onChangeMarca = marca => this.setState({marca:marca});
  onChangeTipo = tipo => this.setState({tipo:tipo});


  registrarCoche = async (navigation) => {
    this.setState({sending: true});
    if(this.state.nombre.length >0&&this.state.marca.length>0&&this.state.tipo.length>0&&this.state.userKey.length>0){

        fetch('http://192.168.0.160/backtalleres-master/registroCoche.php', {
          method: 'POST',
          headers: {},
          body: JSON.stringify({
            userKey: this.state.userKey,
            nombre: this.state.nombre,
            marca: this.state.marca,
            tipo: this.state.tipo,
          })
        }).then((response) => response.json())
          .then((responseJson) => {
            // If server response message same as Data Matched
            console.log(responseJson);
          if(responseJson[0] == 'El coche ha sido creado')
              {         
                  this.setCoches(responseJson[1]);
                  console.log(this.state.coches);
                  navigation.push("Index",{coches:this.state.coches,userKey:this.state.userKey});
              }
            else{
              console.log("Eror en la creacion");
            }
          }).catch((error) => {
            console.error(error);
          });
    }else{
      <Text>ggg</Text>
    }
  }

  render() { 
      return (
          <View>
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
              <Text>Nombre Vehiculo</Text>
              <InputRegistro onChange= {this.onChangeNombre} placeholder={"Nombre"} id = {"nombre"} secure = {false}></InputRegistro>
              </View>
              <View style={{padding:5}}>
              <Text>Marca</Text>
              <InputRegistro onChange= {this.onChangeMarca} placeholder={"Marca"} id = {"marca"} secure = {false}></InputRegistro>
              </View>
              <View style={{padding:5}}>
              <Text>Tipo</Text>
              <InputRegistro onChange = {this.onChangeTipo} placeholder={"Tipo"} id = {"tipo"} secure = {false}></InputRegistro>
              </View>
              <View style={{margin:5}}>
              <Button 
              onPress = {()=>this.registrarCoche(this.props.navigation)}
              title =  "RegistrarCoche"
              color = "red" 
              >
              </Button>
              </View>
              </View>
              </View>
          </View>
      );
  }

};
export default RegistroCoches;
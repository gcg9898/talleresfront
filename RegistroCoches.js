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
      flagNombre:this.props.navigation.state.params.flagNombre,
      flagMarca:this.props.navigation.state.params.flagMarca,
      flagTipo:this.props.navigation.state.params.flagTipo,
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

        fetch('https://tallercoche.es/backtalleres-master/registroCoche.php', {
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
            
          if(responseJson[0] == 'El coche ha sido creado')
              {        
                this.setState({flagNombre:true}); 
                this.setState({flagMarca:true});
                this.setState({flagTipo:true});
                  this.setCoches(responseJson[1]);
                  console.log(this.state.coches);
                  navigation.push("Index",{coches:this.state.coches,userKey:this.state.userKey,flagNombre:this.state.flagNombre,flagMarca:this.state.flagMarca,flagTipo:this.state.flagTipo});
              }
            else{
              console.log("Eror en la creacion");
            }
          }).catch((error) => {
            console.error(error);
          });
    }else{
      if(this.state.nombre.length==0){
        this.setState({flagNombre:false});
      }else
        this.setState({flagNombre:true});

      if(this.state.marca.length==0){
        this.setState({flagMarca:false});
      }else
       this.setState({flagMarca:true});

      if(this.state.tipo.length==0){
        this.setState({flagTipo:false});
      }else
        this.setState({flagTipo:true});
    }
  }

  render() { 
    const flagNombre=this.state.flagNombre;
    const flagTipo=this.state.flagTipo;
    const flagMarca=this.state.flagMarca;
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
              <InputRegistro onChange= {this.onChangeNombre} flag={flagNombre} placeholder={"Nombre"} id = {"nombre"} secure = {false}></InputRegistro>
              </View>
              <View style={{padding:5}}>
              <Text>Marca</Text>
              <InputRegistro onChange= {this.onChangeMarca} flag={flagMarca} placeholder={"Marca"} id = {"marca"} secure = {false}></InputRegistro>
              </View>
              <View style={{padding:5}}>
              <Text>Tipo</Text>
              <InputRegistro onChange = {this.onChangeTipo} flag={flagTipo} placeholder={"Tipo"} id = {"tipo"} secure = {false}></InputRegistro>
              </View>
              <View style={{margin:5}}>
              <Button 
              onPress = {()=>this.registrarCoche(this.props.navigation)}
              title =  "Registrar Coche"
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
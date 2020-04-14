import React from 'react';
import { StyleSheet, Text, View ,Button,Image,FormLabel,TouchableOpacity} from 'react-native';
import {Component} from 'react';
import InputRegistro from './InpuntRegistro';

class Index extends React.Component 
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


  registrarCoche = async () => {
    this.setState({sending: true});
    
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
      if(responseJson[0] == 'El coche ha sido creado')
          {         
              this.setCoches(responseJson[1]);
              console.log(this.state.coches);
          }
        else{
          console.log("Eror en la creacion");
        }
      }).catch((error) => {
        console.error(error);
      });
  }



  mostrarCoche = async (coche)=>{
    await this.setClick(coche.indice);
    this.postCoche2(this.props.navigation);
  }
  postCoche2 = async (navigation) => {
    this.setState({sending: true});
    navigation.navigate("VistaCoche", {indice:this.state.click, userKey:this.state.userKey});
  }



  render() {

      const coches = () =>
      { 
        if (this.state.coches != "No hay coches que mostrar")
        {
          const carros = this.state.coches.map(coche => {
            return <Text key = {coche.indice} onPress={() => {
              this.mostrarCoche(coche);
            }
            }>{coche.nombre}</Text>
        })
        return carros;
        }
        else
        {
          return  <Text>Ningun coche que mostrar</Text>
        }
      }
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
              
              {coches()}

              <View style={{padding:5}}>
              <Text>Nombre</Text>
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
export default Index;
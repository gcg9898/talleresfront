import React from 'react';
import { StyleSheet, Text, View ,Button,Image,FormLabel,TouchableOpacity} from 'react-native';
import {Table, TableCell, TableHead, TableBody, TableRow} from "@material-ui/core";
import {Component} from 'react';
import InputRegistro from './InpuntRegistro';
import { red } from 'color-name';
import { Icon } from 'react-native-elements';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DeleteIcon from '@material-ui/icons/Delete';

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
      flagNombre:true,
      flagMarca:true,
      flagTipo:true,
    };

  

  setCoches = c => this.setState({coches:c});
  setUserKey = d => this.setState({user_key:d});
  setClick = e => this.setState({click:e});

  onChangeNombre = nombre => this.setState({nombre:nombre});
  onChangeMarca = marca => this.setState({marca:marca});
  onChangeTipo = tipo => this.setState({tipo:tipo});



  index = async (navigation) => {
    this.setState({flagNombre: true});
    this.setState({flagMarca: true});
    this.setState({flagTipo: true});
    navigation.navigate("RegistroCoches",{userKey:this.state.userKey,coches:this.state.coches,flagNombre:this.state.flagNombre,flagMarca:this.state.flagMarca,flagTipo:this.state.flagTipo});
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
            return (
              <TableRow key={coche.indice}>
                <TableCell align="center">{coche.nombre}</TableCell>
                <TableCell align="center">{coche.marca}</TableCell>
                <TableCell align="center">{coche.tipo}</TableCell>
                <TableCell align="center">
                <ArrowForwardIosIcon
                    onClick={() => {
                      this.mostrarCoche(coche)}} /> 
            
                </TableCell>
                <TableCell align="center"><DeleteIcon style={{color:'red'}} /></TableCell>
              </TableRow>
              )
        })
      
        return (
          <Table>
            <TableHead>
              <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Marca</TableCell>
              <TableCell align="center">Tipo</TableCell>
              <TableCell align="center">Detalles</TableCell>
              <TableCell align="center">Borrar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carros}
            </TableBody>
          </Table>);
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

            <View style={{margin:15}}>
                  <Image source={require('./src/tallercoche-logotipo.png')} style={{width: "100%",height:75}} />
              </View>
              <View style={{margin:5}}>
              <h2 style={{color:"#272D40",textAlign:'center'}}>Coches Registrados</h2>
              </View>
              <View style={{margin:5}}>
              {coches()}
              </View>
              <View style={{margin:5}}>
              <Button style={{margin:10}}
              title =  "Registrar Coche"
              color = "red" 
                onPress = {()=>this.index(this.props.navigation)}></Button>
                </View>

              </View>
              </View>
          </View>
      );
  }
};
export default Index;
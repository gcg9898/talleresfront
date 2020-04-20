import React from 'react';
import { StyleSheet, Text, View ,Button,Image,FormLabel,TouchableOpacity} from 'react-native';
import {Component} from 'react';
import InputRegistro from './InpuntRegistro';

class DatosCoche extends React.Component 
{
   
    state = {
        userKey:this.props.navigation.state.params.userKey,
        indice:this.props.navigation.state.params.indice,
        kms_totales:"",
        kmsNuevos:"",
        litros:"",
        litrosNuevos:"",
        euros:"",
        eurosNuevos:"",
        mediaEL: "",
        mediaLK: "",
        mediaEK: "",
        error: null,
        sending: false,
    };

    setKMS = k => this.setState({kms_totales:k});
    setLitros = l => this.setState({litros:l});
    setEuros = e => this.setState({euros:e});
    setMediaLK = lk => this.setState({mediaLK:lk});
    setMediaEL = el => this.setState({mediaEL:el});
    setMediaEK = ek => this.setState({mediaEK:ek});
 
    

    actualizarEspecificacionesCoche = async (navigation) => {
    this.setState({sending: true});
    fetch('http://192.168.0.160/backtalleres-master/altaEspecificacionesCoche.php', {
        method: 'POST',
        headers: {},
        body: JSON.stringify({
        user_key: this.state.userKey,
        indice: this.state.indice,
        litros: this.state.litrosNuevos,
        kilometros_totales: this.state.kmsNuevos,
        euros: this.state.eurosNuevos
        })
    }).then((response) => response.json())
        .then((responseJson) => {
        // If server response m]);essage same as Data Matched
        if(responseJson[0] == 'Correcto')
        {
            var coche = responseJson[1];
            this.setKMS(coche.kilometros_totales);
            this.setLitros(coche.litros);
            this.setEuros(coche.euros);
            this.setMediaLK(coche.mediaLK);
            this.setMediaEL(coche.mediaEL);
            this.setMediaEK(coche.mediaEK);
            navigation.push("VistaCoche",{indice:this.state.indice, userKey:this.state.userKey});
        }
        else
        {
            console.log("Eror en login");
        }
        }).catch((error) => {
        console.error(error);
        });
    }

    onChangeKMS = kms => this.setState({kmsNuevos: kms});
    onChangeLitros = litros => this.setState({litrosNuevos: litros});
    onChangeEuros = euros => this.setState({eurosNuevos: euros});


    render(){       
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent:'center'
            }}>
            <View style={{
                flexDirection: 'column',
                justifyContent:'center',
            }}>
                <View style={{margin:15}}>
                  <Image source={require('./src/tallercoche-logotipo.png')} style={{width: "100%",height:40}} />
              </View>
                <InputRegistro onChange= {this.onChangeKMS} placeholder={"Kms"} id = {"kms"} secure = {false}></InputRegistro>
                <InputRegistro onChange= {this.onChangeLitros} placeholder={"Litros"} id = {"litros"} secure = {false}></InputRegistro>
                <InputRegistro onChange= {this.onChangeEuros} placeholder={"Euros"} id = {"euros"} secure = {false}></InputRegistro>
                <Button 
                    style={{margin:10,borderRadius:50}}
                    onPress = {()=>this.actualizarEspecificacionesCoche(this.props.navigation)}
                    title =  "Actualizar"
                    color = "red"  >
                </Button>
                </View>
            </View>
        );
    }
};
export default DatosCoche;
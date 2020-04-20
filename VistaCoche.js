import React from 'react';
import { StyleSheet, Text, View ,Button,Image,FormLabel,TouchableOpacity} from 'react-native';
import {Component} from 'react';
import InputRegistro from './InpuntRegistro';

class VistaCoche extends React.Component 
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

    constructor(props)
    {
        super(props);
        fetch('http://192.168.0.160/backtalleres-master/cogerEspecificacionesCoches.php', {
            method: 'POST',
            headers: {},
            body: JSON.stringify({
                user_key:this.state.userKey,
                indice:this.state.indice,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
            // If server response message same as Data Matched
            if(responseJson[0] == "El coche existe")
            {        
                var coche = responseJson[1];
                this.setKMS(coche.kilometros_totales);
                this.setLitros(coche.litros);
                this.setEuros(coche.euros);
                this.setMediaLK(coche.mediaLK);
                this.setMediaEL(coche.mediaEL);
                this.setMediaEK(coche.mediaEK);
            }
            else
            {
                console.log("No existe el coche");
                console.log(this.state.userKey,this.state.indice);
            }
            }).catch((error) => {
            console.error(error);
            });
    
    }

    onChangeKMS = kms => this.setState({kmsNuevos: kms});
    onChangeLitros = litros => this.setState({litrosNuevos: litros});
    onChangeEuros = euros => this.setState({eurosNuevos: euros});

    datosCoche = async (navigation) => {
        navigation.navigate("DatosCoche",{indice:this.state.indice, userKey:this.state.userKey});
      }

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
              <View style={{flexDirection:'row'}}>
                <View style={{borderColor:"#fff",borderWidth:2,padding:3,margin:5}}>
                <View style={{flexDirection:'column'}}><Text style={{marginHorizontal:5}}>Kilómetros</Text><Text style={{color:"#8BA9ED"}}>{this.state.kms_totales}</Text></View>
                </View>
                <View style={{borderColor:"#fff",borderWidth:2,padding:3,margin:5}}>
                <View style={{flexDirection:'column'}}><Text style={{marginHorizontal:5}}>Litros Repostados</Text><Text style={{color:"#8BA9ED"}}>{this.state.litros}</Text></View>
                </View>
                <View style={{borderColor:"#fff",borderWidth:2,padding:3,margin:5}}>
                <View style={{flexDirection:'column'}}><Text style={{marginHorizontal:5}}>Euros</Text><Text style={{color:"#8BA9ED"}}>{this.state.euros}</Text></View>
                </View>
                </View>
                <Button 
              onPress = {()=>this.datosCoche(this.props.navigation)}
              title =  "Actualizar"
              color = "red" 
              >
              </Button>
                <Text>Media euro/litro: {this.state.mediaEL}</Text>
                <Text>Media litros/100kms: {this.state.mediaLK}</Text>
                <Text>Media euros/kilometro: {this.state.mediaEK}</Text>
                </View>
            </View>
        );
    }
};
export default VistaCoche;
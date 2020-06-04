import React from 'react';
import {Text, View ,Button,Image,StyleSheet} from 'react-native';
//import styles from "./style.css";
const styles = StyleSheet.create({
    
    tituloContador: {
        fontSize: '1.3em',
        fontWeight: 500,
        color: "#3d3d3d",
        textAlign: 'center',
        lineHeight: '1.3em',
    },
    
    datoContador: {
        fontSize:'1.6em',
        fontWeight: 600,
        textAlign: 'center',
        color: '#8e0007',
    },
    
    tituloRegistro: {
        letterSpacing:1,
        lineHeight: '1.2em',
        fontSize: '1.4em',
        fontWeight: 600,
        textTransform: 'uppercase',
        borderBottom: 1,
        textAlign: 'center',
        borderColor:'#3d3d3d',
    },
    
    dataRegistro: {
        fontSize: '1.2em',
        lineHeight: '1.4em',
    
    },
    valueRegistro: {
        fontSize: '1.3em',
        fontWeight: 600,
        color: '#D01C25',
    }
  });
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
        flagKMS:true,
        flagLitros:true,
        flagEuros:true,
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
        fetch('https://tallercoche.es/backtalleres-master/cogerEspecificacionesCoches.php', {
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
        navigation.navigate("DatosCoche",{indice:this.state.indice, userKey:this.state.userKey,flagKMS:this.state.flagKMS,flagLitros:this.state.flagLitros,flagEuros:this.state.flagEuros});
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
                  <Image source={require('./src/tallercoche-logotipo.png')} style={{width: "100%",height:77}} />
              </View>
              <View style={{flexDirection:'row'}}>
                <View style={{borderColor:"#000",borderWidth:2,padding:3,margin:5}}>
                <View style={{flexDirection:'column'}}><Text style={styles.tituloContador}>Kilómetros</Text><Text style={styles.datoContador}>{this.state.kms_totales}</Text></View>
                </View>
                <View style={{borderColor:"#000",borderWidth:2,padding:3,margin:5}}>
                <View style={{flexDirection:'column'}}><Text style={styles.tituloContador}>Litros Repostados</Text><Text style={styles.datoContador}>{this.state.litros}</Text></View>
                </View>
                <View style={{borderColor:"#000",borderWidth:2,padding:3,margin:5}}>
                <View style={{flexDirection:'column'}}><Text style={styles.tituloContador}>Euros</Text><Text style={styles.datoContador}>{this.state.euros}</Text></View>
                </View>
                </View>
                <Button 
              onPress = {()=>this.datosCoche(this.props.navigation)}
              title =  "Actualizar"
              color = "red" 
              >
              </Button>
              <View style={{padding:5,borderColor:"#000",borderWidth:2,margin:5}}>
              <View style={{padding:5,borderColor:"#3d3d3d",borderBottom:2}}>
                <Text style={styles.tituloRegistro}>Último Registro</Text>
              </View>
              <View style={{flexDirection:'row'}}><Text style={styles.dataRegistro}>Media euro/litro:</Text><Text style={styles.valueRegistro}> {this.state.mediaEL}</Text></View>
              <View style={{flexDirection:'row'}}><Text style={styles.dataRegistro}>Media litros/100kms:</Text><Text style={styles.valueRegistro}> {this.state.mediaLK}</Text></View>
              <View style={{flexDirection:'row'}}><Text style={styles.dataRegistro}>Media euros/kilometro:</Text><Text style={styles.valueRegistro}> {this.state.mediaEK}</Text></View>
              </View>
                </View>
            </View>
        );
    }
};
export default VistaCoche;
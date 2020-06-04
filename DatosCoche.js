import React from 'react';
import {Text, View ,Button,Image} from 'react-native';
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
        flagKMS:this.props.navigation.state.params.flagKMS,
        flagLitros:this.props.navigation.state.params.flagLitros,
        flagEuros:this.props.navigation.state.params.flagEuros,
    };

    setKMS = k => this.setState({kms_totales:k});
    setLitros = l => this.setState({litros:l});
    setEuros = e => this.setState({euros:e});
    setMediaLK = lk => this.setState({mediaLK:lk});
    setMediaEL = el => this.setState({mediaEL:el});
    setMediaEK = ek => this.setState({mediaEK:ek});
 
    onChangeKMS = kms => this.setState({kmsNuevos: kms});
    onChangeLitros = litros => this.setState({litrosNuevos: litros});
    onChangeEuros = euros => this.setState({eurosNuevos: euros});

    actualizarEspecificacionesCoche = async (navigation) => {
    this.setState({sending: true});
    if(this.state.kmsNuevos.length >0&&this.state.litrosNuevos.length>0&&this.state.eurosNuevos.length>0&&this.state.userKey.length>0){
        fetch('https://tallercoche.es/backtalleres-master/altaEspecificacionesCoche.php', {
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
                //prueba
                var coche = responseJson[1];
                this.setKMS(coche.kilometros_totales);
                this.setLitros(coche.litros);
                this.setEuros(coche.euros);
                this.setMediaLK(coche.mediaLK);
                this.setMediaEL(coche.mediaEL);
                this.setMediaEK(coche.mediaEK);
                this.setState({flag:true});
                navigation.push("VistaCoche",{indice:this.state.indice, userKey:this.state.userKey,flagKMS:this.state.flagKMS,flagLitros:this.state.flagLitros,flagEuros:this.state.flagEuros});
            }
            else
            {
                console.log("Eror en login");
            }
            }).catch((error) => {
            console.error(error);
            });
     }else{
        if(this.state.kmsNuevos.length==0){
            this.setState({flagKMS:false});
          }else
            this.setState({flagKMS:true});
    
          if(this.state.litrosNuevos.length==0){
            this.setState({flagLitros:false});
          }else
           this.setState({flagLitros:true});
    
          if(this.state.eurosNuevos.length==0){
            this.setState({flagEuros:false});
          }else
            this.setState({flagEuros:true});
     }
    }


    render(){ 
        const flagKMS=this.state.flagKMS;  
        const flagLitros=this.state.flagLitros;
        const flagEuros=this.state.flagEuros;    
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
                  <Image source={require('./src/tallercoche-logotipo.png')} style={{width: "100%",height:43}} />
              </View>
              <View style={{padding:5}}>
                 <Text>Kilometros Recorridos</Text>
                <InputRegistro onChange={this.onChangeKMS} flag={flagKMS} placeholder={"Kms"} id = {"kms"} secure = {false}></InputRegistro>
                </View>
                <View style={{padding:5}}>
                <Text>Litros Repostados</Text>
                <InputRegistro onChange={this.onChangeLitros} flag={flagLitros} placeholder={"Litros"} id = {"litros"} secure = {false}></InputRegistro>
                </View>
                <View style={{padding:5}}>
                <Text>Euros Gastados</Text>
                <InputRegistro onChange={this.onChangeEuros} flag={flagEuros} placeholder={"Euros"} id = {"euros"} secure = {false}></InputRegistro>
                </View>
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
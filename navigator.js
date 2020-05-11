import Login from './login';
import Index from './index';
import Registro from './registro';
import VistaCoche from './VistaCoche';
import RegistroCoches from './RegistroCoches'
import DatosCoche from './DatosCoche'
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';


const Navegador1 = createStackNavigator(
    {
      Login: { screen: Login },
      Index: { screen: Index },
      Registro: {screen: Registro},
      RegistroCoches:{screen:RegistroCoches},
      VistaCoche: {screen: VistaCoche},
      DatosCoche:{screen:DatosCoche}
    },
    {initialRouteName: 'Login'}
    );
    const Navegador = createAppContainer(Navegador1);
    export default Navegador;
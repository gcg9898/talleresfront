import Login from './login';
import Index from './index';
import Registro from './registro';
import { createStackNavigator} from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';


const Navegador1 = createStackNavigator(
    {
      Login: { screen: Login },
      Index: { screen: Index },
      Registro: {screen: Registro}
    },
    {
        initialRouteName: 'Login',
    }
    
    );
    const Navegador = createAppContainer(Navegador1);

    export default Navegador;
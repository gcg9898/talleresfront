import Login from './login';
import Ofertas from './ofertas';
import Registro from './registro';
import { createStackNavigator} from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';


const Navegador1 = createStackNavigator(
    {
      Login: { screen: Login },
      Ofertas: { screen: Ofertas },
      Registro: {screen: Registro}
    },
    {
        initialRouteName: 'Login',
    }
    
    );
    const Navegador = createAppContainer(Navegador1);

    export default Navegador;
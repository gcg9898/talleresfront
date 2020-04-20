import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Component} from 'react';
import Navegador from "./navigator";
//AppRegistry.registerComponent(Login, () => Login);
export default class App extends React.Component {
  render() {
    return (
      <Navegador/>
    );
  }
}
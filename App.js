// Shake your phone to open up the developer menu

// Ron [] Swanson
// https://memeguy.com/photos/images/mrw-theres-been-an-influx-of-ron-swanson-gifs-on-reddit-133400.gif

import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import ProjectList from './src/components/ProjectList';
import EmptyProject from './src/components/EmptyProject';
import Project from './src/components/Project';
import Placeholder from './src/components/Placeholder';

const App = StackNavigator({
    ProjectList: { screen: ProjectList },
    EmptyProject: { screen: EmptyProject },
    Project: { screen: Project },
    Placeholder: { screen: Placeholder },
});

export default App;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 42
  }
});

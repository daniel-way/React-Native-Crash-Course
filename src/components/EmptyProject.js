import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';

import data from '../data/projects.json';

export default class EmptyProject extends React.Component {
  static navigationOptions = {
    title: 'New Project',
  };

  render() {
    const { navigate } = this.props.navigation;
    const reset = () => {
      return this.props.navigation.dispatch(NavigationActions.reset(
        {
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'ProjectList'})]
        }
      ));
    };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello Daniel!</Text>
        <Text style={styles.paragraph}>{"\n"}Use this space to create ideas for new songs, parts, or other ideas you want to grow into something beautiful!</Text>
        <Button
          onPress={() => reset()}
          title='Back to Projects'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24
  },
  container: {
    flex: 1,
    width: 375,
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

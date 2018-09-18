import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Project extends React.Component {
  state = {
      songName: this.props.navigation.state.params.project.songName,
      owner: this.props.navigation.state.params.project.owner,
      description: JSON.stringify(this.props.navigation.state.params.project.description),
      comments: this.props.navigation.state.params.project.comments
  }
  static navigationOptions = ({ navigation }) => {
      return {
        title: navigation.state.params.project.songName
    };
  };
  render() {
      console.log(this.props.navigation.state.params.project.songName);
    const { navigate } = this.props.navigation;
    const reset = () => {
        return this.props.navigation.dispatch(NavigationActions.reset(
            {
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'ProjectList'})]
        }));
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.introSection}>
            <Text style={styles.title}>{this.state.songName}</Text>
            <Text>Owner: {this.state.owner}</Text>
            <Text style={styles.paragraph}>{"\n"}{this.state.description}</Text>
        </View>
        <View style={styles.waveformSection}>
            <Text style={styles.emptyTitle}>{"\n"}Where the waveform goes</Text>
        </View>
            <Text style={styles.happyEaster}>Easter Egg</Text>
        <View style={styles.todoList}>
            <Text style={styles.emptyTitle}>Where the Todos will go</Text>
        </View>
        <View style={styles.comments}>
            <Text style={styles.emptyTitle}>Where the comments will go</Text>
        </View>
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
  emptyTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    opacity: 0.55
  },
  introSection: {
    width: 375,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveformSection: {
    width: 375,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoList: {
    width: 375,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  comments: {
    width: 375,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    height: 2000,
    backgroundColor: 'magenta',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'justify',
    marginHorizontal: 34
  },
  happyEaster: {
    color: '#fff'
  }
});

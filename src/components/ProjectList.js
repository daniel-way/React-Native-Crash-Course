import React from 'react';
import { StyleSheet, Text, View, Button, ListView, Image } from 'react-native';
import data from '../data/projects.json';

state = {
  gameId: 1,
  initialSeconds: 10,
};
let newGame = this.state;

resetGame = () => {
    this.setState((prevState) => {
        return { gameId: prevState.gameId + 1};
    });
}
const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});
const dataSource = ds.cloneWithRows(data);

export default class ProjectList extends React.Component {
  static navigationOptions = {
    title: 'Projects',
};
  render() {
    const { navigate } = this.props.navigation;
    const projectSelect = (project, newGame) => {
        console.log(newGame);
        if(project.songName !== "R75") {
            navigate('Project', { project })
        } else {
            navigate('Placeholder', { newGame })
        }
    };
    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          renderRow={(rowData) =>
            <View style={styles.projectContainer}>
              <Text style={styles.title}>{rowData.songName}</Text>
              <Text>{rowData.owner}</Text>
              <Button
                  title="Go to Project"
                  onPress={() => projectSelect(rowData, newGame)}
              />
            </View>
          }
        />
        <Button
            onPress={() => navigate('EmptyProject')}
            title='New Project'
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
    paddingTop: 10
  },
  projectContainer: {
    width: 375,
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'black',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 1
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 42
  }
});

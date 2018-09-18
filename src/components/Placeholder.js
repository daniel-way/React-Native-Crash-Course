import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

import RandomNumber from './Numbers/RandomNumber';
// import shuffle from '../../node_modules/lodash/shuffle';
import shuffle from 'lodash.shuffle';

export default class Project extends React.Component {
  randomNumberCount = 6;

  state = {
    title: 'Special Guest Star!',
    selectedIds: [],
    key: this.props.navigation.state.params.newGame.gameId,
    remainingSeconds: this.props.navigation.state.params.newGame.initialSeconds,
  };
  gameStatus = 'PLAYING';

  randomNumbers = Array.from({ length: this.randomNumberCount })
                       .map(() => 1 + Math.floor(10 * Math.random()));

  target = this.randomNumbers.slice(0, this.randomNumberCount - 2)
                             .reduce((acc, curr) => acc + curr, 0);
  shuffledRandomNumbers = shuffle(this.randomNumbers);

  static navigationOptions = {
    title: 'Special Guest Star',
  };

  isNumberSelected = (numIndex) => {
      return this.state.selectedIds.indexOf(numIndex) >= 0;
  };

  selectNumber = (numIndex) => {
      this.setState((prevState) => ({
          selectedIds: [...prevState.selectedIds, numIndex]
      }));
  };
  // targetPanelStyle = (gameStatus) => {
  //    We can do this more easily
  // };

  componentDidMount() {
    this.intervalId = setInterval(() => {
        this.setState((prevState) => {
            return { remainingSeconds: prevState.remainingSeconds - 1 };
        }, () => {
            if(this.state.remainingSeconds === 0) {
                clearInterval(this.intervalId);
            }
        });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
        this.gameStatus = this.calcGameStatus(nextState);
        // Clears
        if(this.gameStatus !== 'PLAYING') {
            clearInterval(this.intervalId);
        }
    }
  }

  calcGameStatus = (nextState) => {
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);
    console.log('calcGameStatus');
    if(sumSelected < this.target && nextState.remainingSeconds !== 0) {
        return 'PLAYING';
    }
    if(sumSelected === this.target) {
        this.setState({ title: 'You Won!'});
        return 'WON';
    }
    if(sumSelected > this.target || nextState.remainingSeconds === 0) {
        this.setState({ title: 'You Lost!'});
        return 'LOST';
    }
  };

  render() {
    const gameStatus = this.gameStatus;
    const { navigate } = this.props.navigation;

    const resetGame = () => {
      console.log("Figure it out later");
    };
    const toProjects = () => {
      return this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'ProjectList'})]
      }));
    };

    return (
      <View style={styles.container}>
        <Text style={styles.emptyTitle}>{this.state.title}{"\n"}</Text>
        <View style={styles[`STATUS_${gameStatus}`]}>
        <Text style={styles.targetNumber}>{/*42*/}{this.target}</Text>
        </View>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) =>
            <RandomNumber key={index}
                          id={index}
                          number={randomNumber}
                          isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'}
                          onPress={this.selectNumber}/>
          )}
        </View>
        <Text style={styles.emptyTitle}>{"\n"}{this.state.remainingSeconds}</Text>
        {this.gameStatus !== 'PLAYING' && (<Button title="Play Again" onPress={() => resetGame()}/>)}
        <Button onPress={() => toProjects()} title='Back to Projects'/>
        <Text>{gameStatus}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    opacity: 0.55
  },
  targetNumber: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  randomContainer: {
    flex: 1,
    width: 375,
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  STATUS_PLAYING: {
    backgroundColor: '#ffffff'
  },
  STATUS_WON: {
    backgroundColor: 'green',
    borderRadius: 8,
  },
  STATUS_LOST: {
    backgroundColor: 'red',
    borderRadius: 8,
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 42
  },
  happyEaster: {

  }
});

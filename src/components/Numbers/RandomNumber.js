import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableHighlight, View, Button } from 'react-native';

class RandomNumber extends React.Component {
  constructor(props) {
      super(props);
      this.state = {pressStatus: false };
  }
  static propTypes = {
      number: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      isDisabled: PropTypes.bool.isRequired,
      onPress: PropTypes.func.isRequired,
  };
// hello
  handlePress = () => {
      console.log('Number '+this.props.number+' pressed.');
      if(this.props.isDisabled) {return;}
      this.props.onPress(this.props.id);
  }

  render() {
    return (
      <TouchableHighlight underlayColor={this.props.isDisabled ? '#dc0000':'#000066'} onPress={this.handlePress}
                          activeOpacity={1}
                          style={styles.button}>

        <Text style={styles.randomNumber, this.props.isDisabled && styles.disabled}>
                          {this.props.number}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderColor: "#000066",
    borderWidth: 2.5,
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 25,
    height: 70,
    width: 70,
  },
  randomNumber: {
    fontSize: 32,
    color: '#0000FF',
    textAlign: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
});

export default RandomNumber;

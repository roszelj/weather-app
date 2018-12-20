import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

export class ZipCodeInput extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      zipcode: null,
      clear: this.props.clear
    }

  }
/*omponentWillReceiveProps(newProps){
    console.log(newProps.clear);
  }*/
  componentDidUpdate(prevProps, prevState) {
      if(this.props.clear !== prevProps.clear){
        this.setState({zipcode: ''});
      }
  }

  saveZipCode(value) {

    if(value.zipcode.length == 5) {
      this.props.getWeather(value.zipcode);
    }
  }

  render() {

    return   <TextInput
              keyboardType="numeric"
              placeholder="Enter a ZipCode"
              maxLength={5}
              onChangeText={(zipcode) => this.saveZipCode({zipcode})}
              value={this.state.zipcode}
              style={styles.input}/>

  }
}

const styles = StyleSheet.create({
  input: {
    padding:20,
    fontSize: 24
  }
});

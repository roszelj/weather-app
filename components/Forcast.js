import React from 'react';
import {
  TouchableOpacity,
  View,
  PropTypes,
  Text
} from 'react-native';

export class Forcast extends React.Component {
  constructor(props) {
    super(props);
    //this.welcome = React.createRef();


    this.state = {
      visable: false
    }
  }

  componentDidMount() {
    //console.log("state", this.props.navigation.state.params);
  }

  initModel = () => {
    //this.welcome.mymodal.visable = true
    //this.welcome.setState({modalVisible: true});

    //this.welcome.setModalVisible(true);
    //this.props.initWelcome(true);
  }

  render() {
    return (
      <View>
        <Text>Test</Text>

      </View>

    );
  }
}

import React from 'react';
import {
  TouchableOpacity,
  View,
  PropTypes,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export class Forcast extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visable: false,
      city: this.props.name,
      todayWeatherData: this.props.todayWeatherData,
      icon: '',
    }

  }

  componentDidMount() {
    //console.log("state", this.props.navigation.state.params);

  }

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.todayWeatherData !== this.props.todayWeatherData) {
        this.setState({todayWeatherData: this.props.todayWeatherData});
        //console.log(this.state.todayWeatherData[0].name);

        switch(this.props.todayWeatherData[0].weather[0].main){
          case 'Clouds':
            this.setState({icon: 'ios-cloudy'});
           break;
          case 'Clear':
            this.setState({icon: 'ios-sunny'});
           break;
          case 'Rain':
            this.setState({icon: 'ios-rainy'});
          case 'Snow':
            this.setState({icon: 'ios-snow'});
          break;

        }

    }
  }

  render() {



    return (

        (this.state.todayWeatherData[0].name > '' ?

      <View style={styles.container}>
          <Text style={styles.city}>{this.state.todayWeatherData[0].name}</Text>
          <Text style={styles.temps}>{Math.ceil(this.state.todayWeatherData[0].main.temp)}&deg; &nbsp;
            {(this.state.todayWeatherData[0].weather[0].description === 'broken clouds' ? 'Partly Cloudy' : this.state.todayWeatherData[0].weather[0].description.charAt(0).toUpperCase() + this.state.todayWeatherData[0].weather[0].description.slice(1))}
          </Text>
          <Ionicons name={this.state.icon} style={styles.weatherIcon}/>
          <View style={styles.bottom}>
              <View style={styles.item}><Text style={styles.temps}>H: {Math.ceil(this.state.todayWeatherData[0].main.temp_max)}&deg;</Text></View>
              <View style={styles.item}><Text style={styles.temps}>L: {Math.ceil(this.state.todayWeatherData[0].main.temp_min)}&deg;</Text></View>
          </View>
      </View>

      : <View style={styles.bottom}><Text>(Enter Zipcode to fetch your 5 day forcast)</Text></View>)


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    paddingTop:10,
    flexDirection: 'column',
  },
  weekForcast: {

  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 10
  },
  weatherIcon: {
    fontSize: 56,
    color: '#666666',
    padding:10
  },
  bottom: {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 20

  },
  left: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  item:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  temps: {
    fontSize:22,

  }
});

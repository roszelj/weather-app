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
      todayWeatherData: this.props.todayWeatherData
    }
  }

  componentDidMount() {
    //console.log("state", this.props.navigation.state.params);
  }

  componentDidUpdate(prevProps, prevState) {

    //this.props.todayWeatherData.map((item, index) => {


      if(prevProps.todayWeatherData !== this.props.todayWeatherData) {
          console.log("got here");
          this.setState({todayWeatherData: this.props.todayWeatherData});
          //console.log(this.state.todayWeatherData[0].name);
      }


  //  });

        //this.setState({city: this.props.name});
        /*
console.log(prevProps);
      if(this.props.todayWeatherData[0].name !== prevProps.todayWeatherData[0].name){
        this.setState(prevState => ({
          todayWeatherData: [...prevProps.todayWeatherData, this.props.todayWeatherData]
        }))

        console.log(todayWeatherData);
      }
      */
/*
      this.setState(prevState => ({
        itemList: prevState.todayWeatherData.map(
          obj => (obj._id === 1234 ? Object.assign(obj, { description: "New Description" }) : obj)
        )
      }));
*/
  }

  render() {

    return (
        (this.state.todayWeatherData[0].name > '' ?

      <View style={styles.container}>
          <Text style={styles.city}>{this.state.todayWeatherData[0].name}</Text>
          <Text style={styles.temps}>{Math.ceil(this.state.todayWeatherData[0].main.temp)}&deg; &nbsp;
            {(this.state.todayWeatherData[0].weather[0].description === 'broken clouds' ? 'Partly Cloudy' : this.state.todayWeatherData[0].weather[0].description.charAt(0).toUpperCase() + this.state.todayWeatherData[0].weather[0].description.slice(1))}
          </Text>
          <Ionicons name="ios-partly-sunny" style={styles.weatherIcon}/>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    paddingTop:10,
    flexDirection: 'column'

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
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'

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

import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'axios';

import { MonoText } from '../components/StyledText';
import { Forcast } from '../components/Forcast';
import { ZipCodeInput } from '../components/ZipCodeInput';


export default class HomeScreen extends React.Component {

  state = {
    weatherData: null,
    clearZipCode: 0,
    city: null,

    temp_max: null,
    temp_low: null,
    todayWeatherData:
    [{
      name: '',
      main: {
        temp: 0,
        pressure: 0,
        humidity: 0,
        temp_min: 0,
        temp_max: 0
      }
    }],
  };

  static navigationOptions = {
    header: null,
  };

  getWeather = async (zipcode) => {
    try {
       //console.log(zipcode);
      //const response = await axios.get('http://api.openweathermap.org/data/2.5/forecast?zip='+zipcode+',us&APPID=aa7a891f01ce693d86be7bf1986b4212');
      const response = await axios.get('http://api.openweathermap.org/data/2.5/weather?zip='+zipcode+',us&units=imperial&APPID=aa7a891f01ce693d86be7bf1986b4212');


      /*
      this.setState({city: response.data.name});
      this.setState({right_now: response.data.main.temp});
      this.setState({temp_max: response.data.main.temp_max});
      this.setState({temp_low: response.data.main.temp_low});
      */
      this.setState({todayWeatherData: [response.data]});

      //const result = response.data.list.map(day => ({ value: 'date' , text: day.dt_txt}));

      //console.log(result);


    } catch (error) {
      //console.error(error);
      console.log(error);

      this.clearZipCode();

      Alert.alert(
          'Error',
          'Unable to fetch weather please try again',
          {text: 'OK', onPress: () => console.log("dsss")},
          { cancelable: false }
        )

    }
  }

  clearZipCode = () => {

    this.setState({clearZipCode: 1});

    //console.log(this.state.clearZipCode);
  }
//contentContainerStyle={styles.contentContainer}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.zipcode}>
          <ZipCodeInput getWeather={this.getWeather} clear={this.state.clearZipCode}/>
        </View>
        { /*<ScrollView style={styles.container}> */ }
          <View style={styles.forcast}>
            <Forcast todayWeatherData={this.state.todayWeatherData}/>
          </View>
      { /*   </ScrollView> */ }
      </View>
    );
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  zipcode: {
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#ccc'
  },

  forcast: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',

  },

  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',

      /*
    marginTop: 10,
    marginBottom: 20,
    */
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

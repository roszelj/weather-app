import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  Keyboard
} from 'react-native';
import { WebBrowser } from 'expo';
import axios from 'axios';
import moment from 'moment';

import ListItem from '../components/ListItem';


import { MonoText } from '../components/StyledText';
import { Forcast } from '../components/Forcast';
import { ZipCodeInput } from '../components/ZipCodeInput';


export default class HomeScreen extends React.Component {
  _keyExtractor = (item, index) => item.id;

  state = {
    isRefreshing: false,
    weatherData: null,
    clearZipCode: 0,
    city: null,
    forcast: [],

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
    five_day_response: [{items: []}]
  };

  static navigationOptions = {
    header: null,
  };

  handleRefresh(){

    console.log("get refresh");

    this.setState({
      isRefreshing: true
    });

    fetch('https://2aa9qjgiqf.execute-api.us-east-1.amazonaws.com/dev/cases')
    .then((response) => response.json())
    .then((responseJson) => {
      //let all_cases = new List(responseJson.map(cases => new Cases(cases)));

      //this.props.actions.setCases(all_cases);

      this.setState({
        isRefreshing: false
      });

      //this.props.actions.calcNearby();

    })
    .catch((error) => {
      console.error(error);
    });

  }

  getWeather = async (zipcode) => {
    try {
       //console.log(zipcode);
      const five_day_response = await axios.get('http://api.openweathermap.org/data/2.5/forecast?zip='+zipcode+',us&units=imperial&APPID=aa7a891f01ce693d86be7bf1986b4212');
      const response = await axios.get('http://api.openweathermap.org/data/2.5/weather?zip='+zipcode+',us&units=imperial&APPID=aa7a891f01ce693d86be7bf1986b4212');


      /*
      this.setState({city: response.data.name});
      this.setState({right_now: response.data.main.temp});
      this.setState({temp_max: response.data.main.temp_max});
      this.setState({temp_low: response.data.main.temp_low});
      */
      this.setState({todayWeatherData: [response.data]});

      this.setState({five_day_response: [five_day_response.data]});

      //let obj = five_day_response.data.list.find(obj => obj.dt == 1545382800);

      //console.log(obj);

      //const [list] = five_day_response.data;

      let [...rest] = five_day_response.data.list;
      //console.log(rest);
      const fiveday_array = [];

      Object.entries(rest).map(([key, value]) => {
        let icon = '';
        switch(value.weather[0].main){
          case 'Clouds':
            icon = 'ios-cloudy';
           break;
          case 'Clear':
            icon = 'ios-sunny';
           break;
        }

        fiveday_array.push({timestamp: value.dt, dt: moment(value.dt_txt).format('HH'), day: moment(value.dt_txt).format('dddd'), max: value.main.temp_max, low: value.main.temp_min, icon: icon, desc: value.weather[0].description});
      }
     );


     let monday_hi = fiveday_array.filter(({day}) => day === 'Monday').reduce((max, item) => {
       return item.max >= max.max ? item : max;
     },{max: Number.MIN_SAFE_INTEGER});

     let monday_low = fiveday_array.filter(({day}) => day === 'Monday').reduce((low, item) => {
       return low.low <= item.low  ? low : item;
     },0);

     let tuesday_hi = fiveday_array.filter(({day}) => day === 'Tuesday').reduce((max, item) => {
       return item.max >= max.max ? item : max;
     },{max: Number.MIN_SAFE_INTEGER});

     let tuesday_low = fiveday_array.filter(({day}) => day === 'Tuesday').reduce((low, item) => {
       return low.low <= item.low  ? low : item;
     },0);

     let wednesday_hi = fiveday_array.filter(({day}) => day === 'Wednesday').reduce((max, item) => {
       return item.max >= max.max ? item : max;
     },{max: Number.MIN_SAFE_INTEGER});

     let wednesday_low = fiveday_array.filter(({day}) => day === 'Wednesday').reduce((low, item) => {
       return low.low <= item.low  ? low : item;
     },0);

     let thursday_hi = fiveday_array.filter(({day}) => day === 'Thursday').reduce((max, item) => {
       return item.max >= max.max ? item : max;
     },{max: Number.MIN_SAFE_INTEGER});

     let thursday_low = fiveday_array.filter(({day}) => day === 'Thursday').reduce((low, item) => {
       return low.low <= item.low  ? low : item;
     },0);

     let friday_hi = fiveday_array.filter(({day}) => day === 'Friday').reduce((max, item) => {
       return item.max >= max.max ? item : max;
     },{max: Number.MIN_SAFE_INTEGER});

     let friday_low = fiveday_array.filter(({day}) => day === 'Friday').reduce((low, item) => {
       return low.low <= item.low  ? low : item;
     },0);

     let saturday_hi = fiveday_array.filter(({day}) => day === 'Saturday').reduce((max, item) => {
       return item.max >= max.max ? item : max;
     },{max: Number.MIN_SAFE_INTEGER});

     let saturday_low = fiveday_array.filter(({day}) => day === 'Saturday').reduce((low, item) => {
       return low.low <= item.low  ? low : item;
     },0);

     let sunday_hi = fiveday_array.filter(({day}) => day === 'Sunday').reduce((max, item) => {
       return item.max >= max.max ? item : max;
     },{max: Number.MIN_SAFE_INTEGER});

     let sunday_low = fiveday_array.filter(({day}) => day === 'Sunday').reduce((low, item) => {
       return low.low <= item.low  ? low : item;
     },0);

     const forcast = [{timestamp: monday_hi.timestamp, day: 'Monday', hi: monday_hi.max, low: monday_low.low, icon: monday_hi.icon},
                      {timestamp: tuesday_hi.timestamp, day: 'Tuesday', hi: tuesday_hi.max, low: tuesday_low.low, icon: tuesday_hi.icon},
                      {timestamp: wednesday_hi.timestamp, day: 'Wednesday', hi: wednesday_hi.max, low: wednesday_low.low, icon: wednesday_hi.icon},
                      {timestamp: thursday_hi.timestamp, day: 'Thursday', hi: thursday_hi.max, low: thursday_low.low, icon: thursday_hi.icon},
                      {timestamp: friday_hi.timestamp, day: 'Friday', hi: friday_hi.max, low: friday_low.low, icon: friday_hi.icon},
                      {timestamp: saturday_hi.timestamp, day: 'Saturday', hi: saturday_hi.max, low: saturday_low.low, icon: saturday_hi.icon},
                      {timestamp: sunday_hi.timestamp, day: 'Sunday', hi: sunday_hi.max, low: sunday_low.low, icon: sunday_hi.icon}];

     forcast.sort(function(a, b){
       return a.timestamp-b.timestamp
     });

     this.setState({forcast: forcast});

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
          <View style={styles.forcast}>
            <Forcast todayWeatherData={this.state.todayWeatherData}/>

            <FlatList
              style={{flexGrow: 1}}
               data={this.state.forcast}
               keyExtractor={this._keyExtractor}
               onRefresh={() => this.handleRefresh()}
               refreshing={this.state.isRefreshing}
               onEndThreshold={0}
               renderItem={ ({item}) => <ListItem navigation={this.props.navigation} data={item} /> }
            />
          </View>


      </View>
    );
  }
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

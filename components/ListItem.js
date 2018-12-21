import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default class ListItem extends Component {

	constructor(props) {
		super(props);
	}

  componentDidMount() {

  }

  static navigationOptions = {
    title: 'Case Details',
  };

	render() {

		return (
				(!!this.props.data.low &&
  			<View>
          <View style={styles.container}>
    				<View style={styles.item}>
              <Text style={styles.text}>{this.props.data.day}</Text>
              <View style={styles.temps}>
                <Text style={styles.temps_text}>H: {Math.ceil(this.props.data.hi)}&deg;</Text>
                <Text style={styles.temps_text}>L: {Math.ceil(this.props.data.low)}&deg;</Text>
              </View>
    				</View>
            <View>
							<Ionicons name={this.props.data.icon} style={styles.weatherIcon}/>
            </View>
          </View>
  			</View>
			)

		);
	}

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'stretch',
    flexDirection: 'row',
    borderBottomWidth:1,
		borderColor:'#CCCCCC',
  },
	item:{
		marginLeft:10,
		marginRight:10,

		flex:1,
		flexDirection:'column',
    alignItems: 'stretch'
	},
	imagem:{
		width:40,
		height:40,
		marginTop:10,
		borderRadius:20
	},
  temps: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch'
  },
  temps_text: {
    fontSize: 18
  },
	info:{
		flex:1,
		flexDirection:'column',
		justifyContent:'center',
		marginLeft:10
	},
  text: {
    fontSize: 24,
  },
	nome:{
		fontSize:15,
		fontWeight:'bold'
	},
	weatherIcon: {
    fontSize: 34,
    color: '#666666',
    padding:10,
		justifyContent: 'center'
  },
});

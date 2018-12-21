import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Platform, StyleSheet } from 'react-native';

export default class ListItem extends Component {

	constructor(props) {
		super(props);
		this.click = this.click.bind(this);
	}

  componentDidMount() {


  }

  static navigationOptions = {
    title: 'Case Details',
  };

	click() {
		//alert("Clicou para abrir a conversa: "+this.props.data.id);
    //console.log(this.props.data.id);
    this.props.navigation.navigate('Details', {
      id: this.props.data.id,
			fetchCase: true,
      otherParam: 'Case Details'
    });

		//console.log(this.props.data.id);
	}

	render() {

		return (

  			<TouchableHighlight onPress={this.click} underlayColor="#CCCCCC">
          <View style={styles.container}>
    				<View style={styles.item}>
              <Text style={styles.text}>{this.props.data.day}</Text>
              <View style={styles.temps}>
                <Text style={styles.temps_text}>H: {this.props.data.hi}</Text>
                <Text style={styles.temps_text}>L: {this.props.data.low}</Text>
              </View>
    				</View>
            <View>
                <Text>{this.props.data.hi}</Text>
            </View>
          </View>
  			</TouchableHighlight>

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
    fontSize: 34,
  },
	nome:{
		fontSize:15,
		fontWeight:'bold'
	}
});

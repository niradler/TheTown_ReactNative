import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Divider
} from 'react-native';
import styles from '../styles/style_home';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: '4',
      assassins: '1',
      assassins_indexes:[],
      detective:'1',
      detective_indexes:[],
      players_map:[],
      show:-1
    };
    this._startGame=this._startGame.bind(this);
    this._endGame=this._endGame.bind(this);
  }
  static navigationOptions = {
    header: null
  };
  _endGame(){
this.setState({
  players: '4',
  assassins: '1',
  assassins_indexes:[],
  detective:'1',
  detective_indexes:[],
  players_map:[],
  show:-1
})
  }
  _startGame(){
    const state= this.state;
    state.show=-1;
    state.players_map=[];
    for (let i = 0; i < state.players; i++) {
      state.players_map.push({
        _id:parseInt(Math.random()*1000),
        index:i,
        name:'Player ' + (i+1),
        role:'Citizen'
      })
    }
    for (let i = 0; i < state.assassins; i++) {
      let p = state.players_map[Math.floor(Math.random() * (state.players))];
      while(p.role !== 'Citizen'){
        p = state.players_map[Math.floor(Math.random() * (state.players))];
      }
      state.assassins_indexes.push(p.index)
      p.role = 'Assassin';
    }
    for (let i = 0; i < state.detective; i++) {
      let p = state.players_map[Math.floor(Math.random() * (state.players))];
      while(p.role !== 'Citizen'){
        p = state.players_map[Math.floor(Math.random() * (state.players))];
      }
      state.detective_indexes.push(p.index)
      p.role = 'Detective';
    }
   this.setState(state,u=>{
    // console.log('state',this.state);
   });
  }
  _onPress(i){
    this.setState({show:this.state.show == i? -1 : i})
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={styles.contentContainer}
          >

          <View >
            <Text style={{
              textAlign:'center',
              fontWeight:'700',
              fontSize:22,
              color:"#841584"
             }}>
              The Town
            </Text>
          </View>
          <View >
            <Text >
              Number of Players:
            </Text>
            <TextInput
            keyboardType='numeric'
              style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1
            }}
              onChangeText={(players) => this.setState({players})}
              value={this.state.players} />
              <Text >
              Number of Detectives:
            </Text>
            <TextInput
            keyboardType='numeric'
              style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1
            }}
              onChangeText={(detective) => this.setState({detective})}
              value={this.state.detective} />
            <Text >
              Number of Assassins:
            </Text>
            <TextInput
            keyboardType='numeric'
              style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1
            }}
              onChangeText={(assassins) => this.setState({assassins})}
              value={this.state.assassins} />
          
          <Button
          style={{
            paddingTop:5
           }}
          onPress={this._startGame}
          title="Start Game"
          color="#841584"
          accessibilityLabel="start the game"
        />
        <Button
        style={{
          paddingTop:5
         }}
        onPress={this._endGame}
        title="End Game"
        color="#309806"
        accessibilityLabel="start the game"
      />
        </View>
        </View>
  
        <FlatList
        style={{
          paddingTop:10,
          paddingLeft:15,
          paddingRight:15,
          display: 'flex',
         
         }}
         contentContainerStyle={{
          justifyContent: 'space-between',
          alignItems: 'stretch',
         }}
        extraData={this.state}
        data={this.state.players_map}
        keyExtractor={(item) => item._id}
        renderItem={({item},obj) => (
          <View style={{
            paddingTop:10,
            paddingLeft:15,
            paddingRight:15,
           }}>
          <Button
          onPress={()=>this._onPress(item.index)}
          title={this.state.show==item.index?item.role:item.name}
          color="#20c7c0"
          accessibilityLabel={this.state.show==item.index?item.role:item.name}
        />
          </View>
          
          )}
      />
     
      </View>
    );
  }

}

export default HomeScreen;

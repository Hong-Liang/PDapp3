/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableHighlight,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 16.49,
      method: 'Topped Up ',
      amount: 0,
      TransacArr: [<View />],
    };
    this.top10 = this.top10.bind(this);
    this.top20 = this.top20.bind(this);
    this.top30 = this.top30.bind(this);
    this.top40 = this.top40.bind(this);
  }
  top10() {
    this.setState({
      amount: 10,
      balance: this.state.balance + 10,
      TransacArr: this.state.TransacArr.concat(
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 10, fontSize: 20}}>
            {this.state.method}
          </Text>
          <Text style={{marginLeft: 250, fontSize: 25}}>
            ${this.state.amount}
          </Text>
        </View>,
      ),
    });
  }
  top20() {
    this.setState({
      amount: 20,
      balance: this.state.balance + 20.0,
      TransacArr: this.state.TransacArr.concat(
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 10, fontSize: 20}}>
            {this.state.method}
          </Text>
          <Text style={{marginLeft: 250, fontSize: 25}}>
            ${this.state.amount}
          </Text>
        </View>,
      ),
    });
  }
  top30() {
    this.setState({
      amount: 30,
      balance: this.state.balance + 30.0,
      TransacArr: this.state.TransacArr.concat(
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 10, fontSize: 20}}>
            {this.state.method}
          </Text>
          <Text style={{marginLeft: 250, fontSize: 25}}>
            ${this.state.amount}
          </Text>
        </View>,
      ),
    });
  }
  top40() {
    this.setState({
      amount: 40,
      balance: this.state.balance + 40.0,
      TransacArr: this.state.TransacArr.concat(
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginLeft: 10, fontSize: 20}}>
            {this.state.method}
          </Text>
          <Text style={{marginLeft: 250, fontSize: 25}}>
            ${this.state.amount}
          </Text>
        </View>,
      ),
    });
  }
  render() {
    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{resizeMode: 'contain', width: 400, height: 250}}
            source={require('./src/110319_ezlinkcard_ezlink.jpg')}
          />
          <Text style={{fontSize: 50, fontWeight: 'bold'}}>
            {this.state.balance.toFixed(2)}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View>
            <TouchableHighlight style={{marginTop: 10}} onPress={this.top10}>
              <Text style={[styles.topL]}> $10 </Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginTop: 30}} onPress={this.top20}>
              <Text style={[styles.topL]}> $20 </Text>
            </TouchableHighlight>
          </View>

          <View>
            <TouchableHighlight style={{marginTop: 10}} onPress={this.top30}>
              <Text style={[styles.topR]}> $30 </Text>
            </TouchableHighlight>
            <TouchableHighlight style={{marginTop: 30}} onPress={this.top40}>
              <Text style={[styles.topR]}> $40 </Text>
            </TouchableHighlight>
          </View>
        </View>
        <Text style={{fontSize: 30, marginTop: 20}}>Transactions</Text>
        <View>{this.state.TransacArr}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topL: {
    backgroundColor: '#98ff73',
    fontSize: 30,
    marginLeft: 60,
    width: 100,
    textAlign: 'center',
  },
  topR: {
    backgroundColor: '#98ff73',
    fontSize: 30,
    marginLeft: 90,
    width: 100,
    textAlign: 'center',
  },
});

export default App;

import React from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableHighlight,
  FlatList,
  ScrollView,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import moment from 'moment';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BScode: [],
      BSname: [],
      BusArrival1: [],
      BusArrival2: [],
      BusArrival3: [],
      BusNo: [],
      currentT: '',
    };
  }
  componentDidMount() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    this.setState({
      //Setting the value of the date time
      currentT:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });

    fetch('http://datamall2.mytransport.sg/ltaodataservice/BusStops', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        AccountKey: 'v4jRYmeMRL6hRTWUvMDquA==',
      },
    })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        for (var i = 0; i < Object.keys(myJson.value).length; i++) {
          this.setState({
            BScode: this.state.BScode.concat(myJson.value[i].BusStopCode),
            BSname: this.state.BSname.concat(myJson.value[i].Description),
          });
        }
      });
    fetch(
      'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2?BusStopCode=01019',
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          AccountKey: 'v4jRYmeMRL6hRTWUvMDquA==',
        },
      },
    )
      .then(response => {
        return response.json();
      })
      .then(resJson => {
        var date = moment()
          .utcOffset('+08:00')
          .format('mm');
        for (var i = 0; i < Object.keys(resJson.Services).length; i++) {
          var time = resJson.Services[i].NextBus.EstimatedArrival;
          var time2 = resJson.Services[i].NextBus2.EstimatedArrival;
          var time3 = resJson.Services[i].NextBus3.EstimatedArrival;

          time = moment(time)
            .utcOffset('+08:00')
            .format('mm');
          time2 = moment(time2)
            .utcOffset('+08:00')
            .format('mm');
          time3 = moment(time3)
            .utcOffset('+08:00')
            .format('mm');

          if (time > date) {
            time = time - date;
          } else {
            time = time;
          }

          if (time2 > date) {
            time2 = time2 - date;
          } else {
            time2 = time2;
          }

          if (time3 > date) {
            time3 = time3 - date;
          } else {
            time3 - date;
          }

          this.setState({
            BusArrival1: this.state.BusArrival1.concat(time),
            BusArrival2: this.state.BusArrival2.concat(time2),
            BusArrival3: this.state.BusArrival3.concat(time3),
            BusNo: this.state.BusNo.concat(resJson.Services[i].ServiceNo),
            currentT: date,
          });
        }
      });
  }
  render() {
    let BusArr = [];
    for (let i = 0; i < this.state.BusNo.length; i++) {
      BusArr.push(
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: '#434745',
            }}>
            <Text style={[styles.busNo]}>{this.state.BusNo[i]}</Text>
            <Text style={[styles.busTime]}>
              {this.state.BusArrival1[i]}
            </Text>
            <Text style={[styles.busTime]}>
              {this.state.BusArrival2[i]}
            </Text>
            <Text style={[styles.busTime]}>
              {this.state.BusArrival3[i]}
            </Text>
          </View>
        </View>,
      );
    }
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#bab8b7',
            alignItems: 'center',
          }}>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate('Profile', {});
            }}>
            <Image
              style={{width: 80, height: 80}}
              source={require('./src/Untitled-1.png')}
            />
          </TouchableHighlight>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#fff',
              width: 300,
            }}>
            <Text style={[styles.BSname]}>{this.state.BSname[2]}</Text>
            <Text style={{fontSize: 20, color: '#636160'}}>
              {' '}
              {this.state.BScode[2]}
            </Text>
          </View>
        </View>
        <View>{BusArr}</View>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 16.49,
      method: 'Topped Up ',
      amount: 0,
      TransacArr: [],
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
    let Trans = [];
    for (let i = 0; i < this.state.TransacArr.length; i++) {
      Trans.push(this.state.TransacArr[i + 1]);
    }
    console.log(Trans);
    return (
      <ScrollView>
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
          <View>{Trans}</View>
        </View>
      </ScrollView>
    );
  }
}

const MainNavigator = createStackNavigator({
  'Bus Arrival': {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
});

const App = createAppContainer(MainNavigator);

const styles = StyleSheet.create({
  BSname: {
    fontSize: 40,
    padding: 2,
    textAlign: 'center',
  },
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
  busNo: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'white',
    margin: 20,
    marginLeft: 20,
    fontSize: 30,
    color: 'black',
    width: 80,
    textAlign: 'center',
  },
  busTime: {
    margin: 15,
    marginTop: 30,
    color: '#03ff68',
    fontSize: 20,
  },
});

export default App;

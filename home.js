/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import moment from 'moment';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {format} from 'date-fns';

class App extends React.Component {
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
          <View style={{flexDirection: 'row'}}>
            <Text style={{margin: 15, fontSize: 30}}>
              {this.state.BusNo[i]}
            </Text>
            <Text style={{margin: 15, marginTop: 30}}>
              {this.state.BusArrival1[i]}
            </Text>
            <Text style={{margin: 15, marginTop: 30}}>
              {this.state.BusArrival2[i]}
            </Text>
            <Text style={{margin: 15, marginTop: 30}}>
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
            backgroundColor: 'black',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 80, height: 80}}
            source={require('./src/Untitled-1.png')}
          />
          <Text style={[styles.BSname]}>{this.state.BSname[2]}</Text>
        </View>
        <View>{BusArr}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BSname: {
    fontSize: 40,
    padding: 2,
    backgroundColor: 'black',
    color: 'white',
  },
});

export default App;

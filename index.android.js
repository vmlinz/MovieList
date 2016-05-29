/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import { AppRegistry, Image, ListView, StyleSheet, Text, View } from 'react-native';

const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});


class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((jsonData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(jsonData.movies),
          loaded: true,
        });
      })
      .done();
  }
  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: movie.posters.thumbnail }} style={styles.thumbnail} />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>
            {movie.title}
          </Text>
          <Text style={styles.year}>
            {movie.year}
          </Text>
        </View>
      </View>
    );
  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies
        </Text>
      </View>
    );
  }
  renderMovieList() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return this.renderMovieList();
  }
}

AppRegistry.registerComponent('Hello', () => Hello);

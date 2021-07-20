import React, { Component } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Card } from "react-native-elements";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

export default class RecommendedScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      url: "http://localhost:5000",
    };
  }
  getData = () => {
    const url = this.state.url + "/recommended_articles";
    axios
      .get(url)
      .then((response) => {
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.getData();
  }

  keyExtractor = (_item, index) => index.toString();

  renderItem = ({ item, index }) => {
    if (item.title) {
      return (
        <View>
          <Card
            key={`card-${index}`}
            title={item.title[0]}
            containerStyle={styles.cardContainer}
            featuredTitleStyle={styles.title}
          >
            <Text style={{ marginBottom: 10 }}>{item.content}</Text>
          </Card>
        </View>
      );
    } else {
      return (
        <Text>
          You will see recommendations as you like or dislike articles
        </Text>
      );
    }
  };

  // featuredSubtitle={`${
  // item.release_date.split("-")[0]
  // } | ${this.timeConvert(item.duration)}`}
  // featuredSubtitleStyle={styles.subtitle}
  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    color: "#fff",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(25),
    marginTop: RFValue(65),
  },
  subtitle: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: RFValue(15),
    fontSize: RFValue(15),
  },
  cardContainer: {
    flex: 1,
    borderRadius: RFValue(10),
    justifyContent: "center",
    // height: RFValue(110),
    marginBottom: RFValue(20),
  },
});

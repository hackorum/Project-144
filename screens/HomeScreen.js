import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Header, Button, Icon } from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends Component {
  state = {
    articleDetails: {},
    url: "http://localhost:5000",
  };
  getArticle = () => {
    const url = this.state.url + "/get_article";
    axios.get(url).then((response) => {
      let details = response.data.data;
      this.setState({
        articleDetails: details,
      });
    });
  };
  likeArticle = () => {
    const url = this.state.url + "/like_article";
    axios
      .post(url)
      .then((_response) => {
        this.getArticle();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  notLikeArticle = () => {
    const url = this.state.url + "/not_like_article";
    axios
      .post(url)
      .then((_response) => {
        this.getArticle();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // small function to make first letter of each word capital
  titleCase = (title) => {
    title = `${title}`;
    var splitStr = title.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };
  componentDidMount() {
    this.getArticle();
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{
            icon: "article",
            color: "#fff",
            onPress: () => this.props.navigation.navigate("topTabNavigator"),
          }}
          centerComponent={{
            text: "Articles",
            style: { color: "white", fontSize: 20 },
          }}
        />
        <ScrollView bounces={false} style={styles.articleContainer}>
          <Text style={styles.articleTitle}>
            {this.titleCase(this.state.articleDetails[12])}
          </Text>
          <Text>{this.state.articleDetails[13]}</Text>
          <View style={styles.buttonContainer}>
            <Button
              title=" Like "
              icon={<Icon name={"check"} type={"entypo"} color={"green"} />}
              onPress={this.likeArticle}
            />
            <Button
              title="Dislike"
              icon={<Icon name={"cross"} type={"entypo"} color={"red"} />}
              onPress={this.notLikeArticle}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  articleContainer: {
    padding: 20,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
    marginBottom: 30,
  },
});

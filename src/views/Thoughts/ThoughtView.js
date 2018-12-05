//@flow

import React, { Component } from "react";
import { View, Text, FlatList, Dimensions } from "react-native";
import type { Thought } from "@services/entities/Thought";
import type { Props as ContainerProps } from "../Thoughts/ThoughtContainer";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import LottieView from "lottie-react-native";

/**
 * @interface Props
 */
type Props = ContainerProps & {};

var _keyExtractor = (item: Thought) => item.id;

var _renderItem = ({ item }) => (
  <Card
    style={{
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10
    }}
  >
    <Card.Cover source={{ uri: item.thumbnail }} />
    <Card.Content>
      <Title style={{ color: "#0c1e32", fontSize: 17 }}>{item.title}</Title>
      <Paragraph>{item.introtext}</Paragraph>
    </Card.Content>
    <Card.Actions>
      <Button>Partager</Button>
    </Card.Actions>
  </Card>
);

const ThoughtView = ({ articles, loading }: Props) => (
  <View style={{ height: "100%", width: "100%" }}>
    {loading && (
      <LottieView
        source={require("../../assets/lottie/skeleton_loading.json")}
        autoPlay
        loop
      />
    )}
    {articles && (
      <FlatList
        style={{ flex: 1 }}
        data={articles}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />
    )}
  </View>
);

export default ThoughtView;

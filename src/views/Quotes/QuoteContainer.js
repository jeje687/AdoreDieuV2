// @flow

import React, { Component } from "react";
import { Text } from "react-native";

export type Props = {};
export type State = {};
export default class QuoteContainer extends Component<Props, State> {
  componentDidMount() {
    console.log("QuoteContainer");
  }

  render() {
    return <Text>Hello</Text>;
  }
}

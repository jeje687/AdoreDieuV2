/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */
import { Platform, StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import Loader from "react-native-mask-loader";
import { Provider } from "react-redux";
import { colors } from "@assets/colors";
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
  Store as ReduxStore,
  Dispatch as ReduxDispatch
} from "redux";
import type { Action } from "./src/actions";
import type { State as GlobalState } from "./src/reducers";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { RootNavigation } from "./src/navigation/RootNavigation";
import reducer from "./src/reducers";

/*export type Store = ReduxStore<GlobalState, Action>;
export type GetState = () => GlobalState;
export type Dispatch = ReduxDispatch<Action> & Thunk<Action>;
export type Thunk<A> = ((Dispatch, GetState) => Promise<void> | void) => A;

// middleware that logs actions
const loggerMiddleware = createLogger({
    predicate: (getState, action) => __DEV__
});

function configureStore(): Store {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware
        )
    );
    return createStore(reducer, enhancer);
}

const store: Store = configureStore();*/

type Props = {};
type State = {
  appHasLoaded: boolean
};

export default class App extends Component<Props, State> {
  state = {
    appHasLoaded: false
  };

  componentDidMount = () => {
    SplashScreen.hide();
    setTimeout(() => {
      this.setState({
        appHasLoaded: true
      });
    }, 50);
  };

  render() {
    return (
      <View key="root" style={{ flex: 1 }}>
        <Loader
          isLoaded={this.state.appHasLoaded}
          imageSource={require("./src/assets/img/gold_crown_plain_white.png")}
          backgroundStyle={{
            backgroundColor: colors.mainColor
          }}
        >
          <RootNavigation />
        </Loader>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  welcome: {
    fontSize: 20,
    color: "#333333",
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

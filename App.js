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
  combineReducers,
  applyMiddleware,
  compose,
  Store as ReduxStore,
  Dispatch as ReduxDispatch
} from "redux";
import type { Action } from "./src/actions";
import type { State as GlobalState } from "./src/reducers";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { RootNavigation } from "./src/navigation/RootNavigation";
import reducer from "./src/reducers";
import RootSaga from "./src/sagas/Root";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/assets/theme";
export type Store = ReduxStore<GlobalState, Action>;
export type GetState = () => GlobalState;

const sagaMiddleware = createSagaMiddleware();

function configureStore(): Store {
  return createStore(reducer, applyMiddleware(sagaMiddleware, logger)); // lets us dispatch() functions
}

const store: Store = configureStore();
sagaMiddleware.run(RootSaga);

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
          imageSource={require("@assets/img/gold_crown_plain_white.png")}
          backgroundStyle={{ backgroundColor: colors.mainColor }}
        >
          <Provider store={store}>
            <PaperProvider theme={theme}>
              <RootNavigation />
            </PaperProvider>
          </Provider>
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

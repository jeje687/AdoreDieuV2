/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */
import { View } from "react-native";
import React, { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import { Navigation } from "react-native-navigation";
import Loader from "react-native-mask-loader";
import { Provider } from "react-redux";
import { colors } from "@assets/colors";
import { createStore, applyMiddleware, Store as ReduxStore } from "redux";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { Provider as PaperProvider } from "react-native-paper";
import ThoughtContainer from "@views/Thoughts";
import CrownImage from "@assets/img/gold_crown_plain_white.png";
import type { Action } from "./src/actions";
import type { State as GlobalState } from "./src/reducers";
import reducer from "./src/reducers";
import RootSaga from "./src/sagas/Root";
import theme from "./src/assets/theme";

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

const withReduxStoreWrapper = (WrappedComponent: any) => (
  <Provider store={store}>
    <PaperProvider theme={theme}>
      <WrappedComponent />
    </PaperProvider>
  </Provider>
);

export function registerScreen() {
  Navigation.registerComponentWithRedux("navigation.Thoughts", () =>
    withReduxStoreWrapper(ThoughtContainer)
  );
}

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
    }, 500);
  };

  render() {
    const { appHasLoaded } = this.state;
    return (
      <View key="root" style={{ flex: 1 }}>
        <Loader
          isLoaded={appHasLoaded}
          imageSource={CrownImage}
          backgroundStyle={{ backgroundColor: colors.mainColor }}
        >
          <Provider store={store}>
            <PaperProvider theme={theme}>
              {/* <RootNavigation /> */}
              <ThoughtContainer />
            </PaperProvider>
          </Provider>
        </Loader>
      </View>
    );
  }
}

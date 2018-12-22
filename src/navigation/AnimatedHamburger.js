// @flow
import React, { Component } from "react";
import Hamburger from "react-native-hamburger";
import { DrawerActions } from "react-navigation";

type Props = {
  navigation: any
};

type State = {
  isOpened: boolean
};

/**
 * @export
 * @class AnimatedHamburger
 * @extends {Component}
 */
export default class AnimatedHamburger extends Component<Props, State> {
  state = {
    isOpened: false
  };

  componentDidUpdate = (prevProps: Props) => {
    const { navigation } = this.props;
    if (
      navigation.state.isDrawerOpen !== prevProps.navigation.state.isDrawerOpen
    ) {
      this.setState(() => ({
        isOpened: navigation.state.isDrawerOpen
      }));
      //   this.hamburger._animate();
    }
  };

  hamburger: any;

  render() {
    const { isOpened } = this.state;
    const { navigation } = this.props;
    return (
      <Hamburger
        ref={hamburger => {
          this.hamburger = hamburger;
        }}
        color="white"
        active={isOpened}
        type="spinCross"
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer({}));
        }}
      />
    );
  }
}

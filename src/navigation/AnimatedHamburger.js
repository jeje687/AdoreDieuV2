//@flow
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
  hamburger: Hamburger;

  state = {
    isOpened: false
  };

  componentDidUpdate = (prevProps: Props, prevState: State) => {
    if (
      this.props.navigation.state.isDrawerOpen !==
      prevProps.navigation.state.isDrawerOpen
    ) {
      this.setState(({ prevState, prevProps }) => ({
        isOpened: this.props.navigation.state.isDrawerOpen
      }));
      this.hamburger._animate();
    }
  };

  render() {
    return (
      <Hamburger
        ref={hamburger => {
          this.hamburger = hamburger;
        }}
        color="white"
        active={this.state.isOpened}
        type="spinCross"
        onPress={() => {
          this.props.navigation.dispatch(DrawerActions.toggleDrawer());
        }}
      />
    );
  }
}

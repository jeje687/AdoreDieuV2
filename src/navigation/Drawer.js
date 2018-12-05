//@flow
import React, { Component } from "react";
import {
  NavigationActions,
  SafeAreaView,
  DrawerActions
} from "react-navigation";
import PropTypes from "prop-types";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { colors } from "@assets/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { DrawerRow } from "./DrawerRow";
import * as Animatable from "react-native-animatable";

interface Props {
  navigation: any;
  /**
   * Current item selected key
   * @type {string}
   * @memberof Props
   */
  activeItemKey: string;
}

interface State {
  /**
   * Index of which view should be animated
   * @type {number}
   * @memberof State
   */
  show: number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default class Drawer extends Component<Props, State> {
  viewsAnimated: Array<Animatable.View> = [];

  state = { show: 0 };

  navigateToScreen = (route: string) => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    this.props.navigation.dispatch(DrawerActions.closeDrawer({}));
  };

  goHome = this.navigateToScreen.bind(this, "Thoughts");
  goCitations = this.navigateToScreen.bind(this, "Citations");
  goMusicPlayer = this.navigateToScreen.bind(this, "MusicPlayer");
  goEducation = this.navigateToScreen.bind(this, "Education");
  goBible = this.navigateToScreen.bind(this, "Bible");

  componentDidUpdate(prevProps: Props, prevState: State) {
    var lastIsOpen = prevProps.navigation.state.isDrawerOpen;
    var isOpen = this.props.navigation.state.isDrawerOpen;
    if (lastIsOpen !== isOpen) {
      if (isOpen) {
        this.viewsAnimated.forEach((view, index) => {
          // Delay each animations

          setTimeout(() => {
            view.bounceInLeft(200).then(() => {});
            this.setState((prevState, prevProps) => ({
              show: index + 1
            }));
          }, index * 100);
        });
      } else {
        this.setState((prevState, prevProps) => ({
          show: 0
        }));
      }
    }
  }

  /**
   * Register a reference for animatable view and add it to viewsAnimated
   * @param {Animatable.View} ref
   * @memberof Drawer
   */
  registerRef = (ref: Animatable.View) => {
    this.viewsAnimated.push(ref);
  };

  render() {
    var { activeItemKey } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <SafeAreaView
            style={styles.container}
            forceInset={{ top: "always", horizontal: "never" }}
          >
            <Image
              source={require("@assets/img/add_logo/add_logo.png")}
              resizeMode="cover"
              style={{ marginTop: 10, marginBottom: 20 }}
            />
            <View
              style={{
                height: 2,
                backgroundColor: colors.accentColor,
                width: "100%"
              }}
            />
            <View
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: colors.mainColor
              }}
            >
              <DrawerRow
                name="md-home"
                title="Home"
                selected={activeItemKey === "Thoughts"}
                onPress={this.goHome}
              />
              <DrawerRow
                name="md-headset"
                title="Music"
                selected={activeItemKey === "MusicPlayer"}
                onPress={this.goMusicPlayer}
              />
              <DrawerRow
                name="md-quote"
                title="Citations"
                selected={activeItemKey === "Citations"}
                onPress={this.goCitations}
              />
              <DrawerRow
                name="md-easel"
                title="Education"
                selected={activeItemKey === "Education"}
                onPress={this.goEducation}
              />
              <DrawerRow
                name="md-book"
                title="Bible"
                selected={activeItemKey === "Bible"}
                onPress={this.goBible}
              />
            </View>
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}

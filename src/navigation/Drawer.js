// @flow
import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import Logo from "@assets/img/add_logo/add_logo.png";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  SafeAreaView
} from "react-native";
import { colors } from "@assets/colors";
import * as Animatable from "react-native-animatable";
import { DrawerRow } from "./DrawerRow";

interface Props {
  navigation: any;
  /**
   * Current item selected key
   * @type {string}
   * @memberof Props
   */
  activeItemKey: string;
  componentId: string;
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

  goHome = () => {
    const { componentId } = this.props;
    // setTimeout(() => {
    //     this.navigateToScreen("Thoughts");
    // }, 50);
    console.log(`COMPONENT ID : ${componentId}`);
    Navigation.mergeOptions("tab1Stack", {
      sideMenu: {
        left: {
          visible: false
        }
      }
    });
    Navigation.setStackRoot("tab1Stack", {
      component: {
        name: "navigation.Thoughts",
        passProps: {
          text: "Root screen"
        }
      },
      options: {
        animations: {
          setStackRoot: {
            enabled: false
          }
        }
      }
    });
  };

  goCitations = () => {
    // setTimeout(() => {
    //     this.navigateToScreen("Citations");
    // }, 50);
    Navigation.mergeOptions("tab1Stack", {
      sideMenu: {
        left: {
          visible: false
        }
      }
    });
    Navigation.setStackRoot("tab1Stack", {
      component: {
        name: "navigation.Quotes",
        passProps: {
          text: "Root screen"
        }
      },
      options: {
        animations: {
          setStackRoot: {
            enabled: false
          }
        }
      }
    });
  };

  //   goMusicPlayer = this.navigateToScreen.bind(this, "MusicPlayer");

  //   goEducation = this.navigateToScreen.bind(this, "Education");

  //   goBible = this.navigateToScreen.bind(this, "Bible");

  navigateToScreen = () => {
    // const navigateAction = this.props.navigation.navigate({
    //   routeName: route
    // });
    // this.props.navigation.dispatch(navigateAction);
    // this.props.navigation.dispatch(DrawerActions.closeDrawer({}));
  };

  /**
   * Register a reference for animatable view and add it to viewsAnimated
   * @param {Animatable.View} ref
   * @memberof Drawer
   */
  registerRef = (ref: Animatable.View) => {
    this.viewsAnimated.push(ref);
  };

  render() {
    const { activeItemKey } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <SafeAreaView
            style={styles.container}
            forceInset={{ top: "always", horizontal: "never" }}
          >
            <Image
              source={Logo}
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

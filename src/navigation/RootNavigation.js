// @flow
import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Text } from "react-native";
import ThoughtContainer from "@views/Thoughts";
import { colors } from "@assets/colors";
import type { NavigationScreenProp } from "react-navigation";
import AnimatedHamburger from "./AnimatedHamburger";
import Drawer from "./Drawer";

export const globalNavOptions = ({
  navigation
}: {
  navigation: NavigationScreenProp<*>
}) => ({
  title: "ReactNavigation",
  headerLeft: (
    <AnimatedHamburger
      navigation={
        navigation // Title to appear in status bar
      }
    />
  ),
  headerStyle: {
    borderBottomWidth: 0,
    backgroundColor: colors.mainColor
  },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "bold" }
});

export const ThoughtsNavigator = createStackNavigator(
  {
    Thoughts: { screen: ThoughtContainer }
  },
  {
    navigationOptions: globalNavOptions
  }
);

const wrapNavigator = (title: string, component: any) =>
  createStackNavigator(
    {
      [title]: { screen: component }
    },
    {
      navigationOptions: globalNavOptions
    }
  );

export const RootNavigation = createDrawerNavigator(
  {
    Thoughts: { screen: ThoughtsNavigator },
    Citations: {
      screen: wrapNavigator("Citation", () => <Text> Citation </Text>)
    },
    MusicPlayer: {
      screen: wrapNavigator("MusicPlayer", () => <Text>Music Player </Text>)
    },
    Education: {
      screen: wrapNavigator("Education", () => <Text>Education</Text>)
    },
    Bible: { screen: wrapNavigator("Bible", () => <Text>Bible</Text>) }
  },
  {
    initialRouteName: "Citations",
    contentComponent: Drawer,
    drawerWidth: 300
  }
);

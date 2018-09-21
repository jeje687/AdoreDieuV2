//@flow
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "@assets/colors";

interface Props {
  /**
   * On click handler
   * @memberof Props
   */
  onPress: () => void;
  /**
   * Icon name included in Ionicon.ttf
   * @type {string}
   * @memberof Props
   */
  name: string;
  /**
   * Title of the row
   * @type {string}
   * @memberof Props
   */
  title: string;
  /**
   * Indicate whether the menu item is selected or not
   * @type {boolean}
   * @memberof Props
   */
  selected?: boolean;
}

export const style = StyleSheet.create({
  rowContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    color: colors.darkMain,
    fontWeight: "bold"
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 13,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: colors.accentColor,
    transform: [
      {
        rotate: "90deg"
      }
    ]
  }
});

export const DrawerRow = (props: Props) => {
  return (
    <TouchableOpacity style={style.rowContainer} onPress={props.onPress}>
      {props.selected && <View style={style.triangle} />}
      <Icon
        name={props.name}
        size={30}
        style={{ marginRight: 20, marginLeft: 10 }}
        color={props.selected ? colors.accentColor : colors.darkMain}
      />
      <Text
        style={[
          style.title,
          {
            color: props.selected ? colors.accentColor : colors.darkMain
          }
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

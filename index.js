/** @format */
import { Navigation } from "react-native-navigation";
import Drawer from "./src/navigation/Drawer";
import App, { registerScreen } from "./App";
import QuoteContainer from "./src/views/Quotes/QuoteContainer";

// AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent("navigation.Quotes", () => QuoteContainer);
registerScreen();
Navigation.registerComponent("navigation.AppScreen", () => App);
Navigation.registerComponent("navigation.Drawer", () => Drawer);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        id: "sideMenu",
        left: {
          component: {
            id: "Drawer",
            name: "navigation.Drawer"
          }
        },
        center: {
          stack: {
            id: "tab1Stack",
            children: [
              {
                component: {
                  name: "navigation.AppScreen",
                  passProps: {
                    text: "This is a side menu center screen tab 1"
                  }
                }
              }
            ]
          }
        }
      }
    }
  });
});

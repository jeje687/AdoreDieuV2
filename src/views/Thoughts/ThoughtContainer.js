// @flow
import React, { Component } from "react";
import { Animated } from "react-native";
import type { State as GlobalState } from "@reducers";
import { connect } from "react-redux";
import { getThoughts } from "@actions/thought.action";
import type { Thought } from "@services/entities/Thought";
import ThoughtView from "./ThoughtView";

export interface Props {
  getThoughts: typeof getThoughts;
  articles: Array<Thought>;
  loading: boolean;
  page: number;
}

export interface State {}

const mapStateToProps = (state: GlobalState) => ({
  articles: state.thoughts.list,
  loading: state.thoughts.loading,
  page: state.thoughts.page
});

const mapDispatchToProps = {
  getThoughts
};

class ThoughtContainer extends Component<Props, State> {
  static navigatorButtons = { leftButtons: [{ id: "sideMenu" }] };

  yPos: number = new Animated.Value(-50);

  animationComplete: boolean = true;

  componentDidMount = () => {
    const { articles, getThoughts } = this.props;
    if (articles == null || articles.length === 0) {
      getThoughts();
    }
  };

  hideLoading = () => {
    Animated.spring(this.yPos, {
      toValue: -50,
      duration: 500
    }).start();
  };

  componentDidUpdate = (prevProps: Props) => {
    const { loading } = this.props;
    if (
      prevProps.page > 1 &&
      (loading === true && prevProps.loading !== loading)
    ) {
      Animated.spring(this.yPos, {
        toValue: 50,
        duration: 500
      }).start(() => {
        this.animationComplete = false;
        this.hideLoading();
      });
    }
    if (
      prevProps.page > 1 &&
      (loading === false && prevProps.loading !== loading)
    ) {
      if (this.animationComplete) {
        this.hideLoading();
      }
    }
  };

  loadMore = () => {
    const { getThoughts, loading } = this.props;
    if (!loading) {
      getThoughts();
    }
  };

  render() {
    console.log("Render");
    return (
      <ThoughtView
        loadMore={this.loadMore}
        yPos={this.yPos}
        {...this.props}
        {...this.state}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThoughtContainer);

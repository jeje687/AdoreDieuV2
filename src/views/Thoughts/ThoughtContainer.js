//@flow
import React, { Component } from "react";
import ThoughtView from "./ThoughtView";
import type { State as GlobalState } from "@reducers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getThoughts } from "@actions/thought.action";
import type { Thought } from "@services/entities/Thought";

export interface Props {
  getThoughts: typeof getThoughts;
  articles: Array<Thought>;
  loading: boolean;
}

interface State {}

const mapStateToProps = (state: GlobalState) => ({
  articles: state.thoughts.list,
  loading: state.thoughts.loading
});

const mapDispatchToProps = {
  getThoughts
};

class ThoughtContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.getThoughts();
  };

  render() {
    return <ThoughtView {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThoughtContainer);

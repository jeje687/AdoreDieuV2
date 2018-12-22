// @flow
import type { Action } from "@actions";
import type { Thought } from "@services/entities/Thought";
import type { State as GlobalState } from "@reducers";

export type ThoughtsState = {
  list: Array<Thought>,
  page: number,
  loading: boolean
};

const initialState: ThoughtsState = {
  list: [],
  page: 1,
  loading: false
};

export const pageSelector = (state: GlobalState) => state.thoughts.page;

const thoughtsReducers = (
  state: ThoughtsState,
  action: Action
): ThoughtsState => {
  switch (action.type) {
    case "GET_THOUGHTS":
      return { ...state, ...{ loading: true } };
    case "GET_THOUGHTS_SUCCESS":
      return {
        ...state,
        ...{
          list: [...state.list, ...action.thoughts],
          loading: false,
          page: state.page + 1
        }
      };
    case "GET_THOUGHTS_FAILED":
      return { ...state, loading: false };
    default:
      return state != null ? state : initialState;
  }
};

export default thoughtsReducers;

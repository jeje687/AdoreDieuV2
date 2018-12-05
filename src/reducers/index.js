// @flow
import { combineReducers } from "redux";
import thoughtsReducers from "./thoughts.reducer";

const reducers = {
  thoughts: thoughtsReducers
};

export type Reducers = typeof reducers;

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;

export default combineReducers(reducers);

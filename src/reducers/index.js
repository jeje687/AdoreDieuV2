// @flow
import { combineReducers } from "redux";

const reducers = {};

export type Reducers = typeof reducers;

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;
export type State = $ObjMap<Reducers, $ExtractFunctionReturn>;

export default combineReducers(reducers);

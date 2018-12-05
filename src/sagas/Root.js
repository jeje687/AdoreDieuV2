//@flow
import { all, fork } from "redux-saga/effects";
import type { Saga } from "redux-saga";
import { watchGetThoughts } from "./ThoughtSaga";
export default function* root(): Saga<void> {
  yield all([fork(watchGetThoughts)]);
}

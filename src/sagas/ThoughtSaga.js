//@flow
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import type { Saga, Effect, Iterable } from "redux-saga";
import type { GetThoughtAction } from "../actions/thought.action.types";
import {
  getThoughtsFailed,
  getThoughtsSucceeded
} from "../actions/thought.action";
import { pageSelector } from "../reducers/thoughts.reducer";
import ArticlesServices from "@services/api/ArticlesServices";

export function* getThoughts(action: GetThoughtAction): Saga<void> {
  try {
    let page = yield select(pageSelector);
    debugger;
    let thoughts = yield call(ArticlesServices.getThoughts, 0, 10);
    yield put(getThoughtsSucceeded(thoughts));
  } catch (err) {
    yield put(getThoughtsFailed(err));
  }
}

export function* watchGetThoughts(): Iterable<Effect> {
  yield takeLatest("GET_THOUGHTS", getThoughts);
}

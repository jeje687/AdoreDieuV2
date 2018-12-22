// @flow
import { call, put, takeLatest, select } from "redux-saga/effects";
import type { Saga, Effect, Iterable } from "redux-saga";
import ArticlesServices from "@services/api/ArticlesServices";
import {
  getThoughtsFailed,
  getThoughtsSucceeded
} from "../actions/thought.action";
import { pageSelector } from "../reducers/thoughts.reducer";

export function* getThoughts(): Saga<void> {
  try {
    const page = yield select(pageSelector);
    const thoughts = yield call(ArticlesServices.getThoughts, page, 10);
    yield put(getThoughtsSucceeded(thoughts));
  } catch (err) {
    yield put(getThoughtsFailed(err));
  }
}

export function* watchGetThoughts(): Iterable<Effect> {
  yield takeLatest("GET_THOUGHTS", getThoughts);
}

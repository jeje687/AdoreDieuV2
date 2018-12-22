// @flow
import type { Thought } from "@services/entities/Thought";

export type GetThoughtAction = {|
  type: "GET_THOUGHTS"
|};

export type GetThoughtsSuccessAction = {|
  type: "GET_THOUGHTS_SUCCESS",
  thoughts: Array<Thought>
|};

export type GetThoughtsFailedAction = {|
  type: "GET_THOUGHTS_FAILED",
  error: string
|};

export type ThoughtsActions =
  | GetThoughtAction
  | GetThoughtsSuccessAction
  | GetThoughtsFailedAction;

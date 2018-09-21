// @flow
import * as AuthActions from "./thought.action";
import type { LoadAction, AuthenticateAction } from "./thought.action";

export type Action = LoadAction | AuthenticateAction;

export const ActionCreators = Object.assign({}, AuthActions);

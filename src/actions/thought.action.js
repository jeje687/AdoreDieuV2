//@flow
import type {
  GetThoughtAction,
  GetThoughtsFailedAction,
  GetThoughtsSuccessAction
} from "./thought.action.types";
import type { Thought } from "@services/entities/Thought";

/**
 * Create a loading thought action
 *
 * @param {boolean} loading
 * @returns {LoadAction}
 */
export const getThoughts = (): GetThoughtAction => ({
  type: "GET_THOUGHTS"
});

export function getThoughtsFailed(error: any): GetThoughtsFailedAction {
  return {
    type: "GET_THOUGHTS_FAILED",
    error: error
  };
}

export function getThoughtsSucceeded(
  articles: Array<Thought>
): GetThoughtsSuccessAction {
  return { type: "GET_THOUGHTS_SUCCESS", thoughts: articles };
}

// export function getThoughts(itemsPerPage?: number) {
//     return async (dispatch: Dispatch, getState: GetState) => {
//         dispatch(createLoadAction(true));
//         let response = await ArticlesServices.getThoughts(0, itemsPerPage);
//         dispatch(createLoadAction(false));
//         dispatch(createSetThoughtsAction(response));
//     };
// }

import { combineReducers, Dispatch, Reducer, Action, AnyAction } from "redux";
import { all, fork } from "redux-saga/effects";
import { LayoutState, layoutReducer } from "../layout";

// TODO: rewrite to use index.ts like layout does...
import heroesSaga from "../heroes/sagas";
import { heroesReducer } from "../heroes/reducer";
import { HeroesState } from "../heroes/types";

// The top-level state object.
//
// `connected-react-router` already injects the router state typings for us,
// so we can ignore them here.
export interface ApplicationState {
  layout: LayoutState,
  heroes: HeroesState
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
  layout: layoutReducer,
  heroes: heroesReducer
});

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
  yield all([fork(heroesSaga)]);
}

const initialLayoutState: LayoutState = {
  theme: "light"
};
const initialHeroState: HeroesState = {
  loading: false,
  data: [],
  errors: undefined
};
export const DefaultState = {
  layout: initialLayoutState,
  heroes: initialHeroState
};

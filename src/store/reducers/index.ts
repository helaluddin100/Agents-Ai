import { combineReducers } from "redux";
import { registerFormReducer } from "./register";
import { RegisterFormI } from "../actions";
import { MapLoadedFormI } from "../actions/setMapLoaded";
import { mapLoadedFormReducer } from "./mapLoaded";

export interface StoreStateI {
  registerForm: RegisterFormI;
  mapLoadedForm: MapLoadedFormI;
}
// @ts-ignore
export const reducers = combineReducers<StoreStateI>({
  registerForm: registerFormReducer,
  mapLoadedForm: mapLoadedFormReducer,
});

import 'redux';
import { ActionTypes } from './types';

export interface RegisterFormI {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

export interface UpdateFormActionI {
  type: ActionTypes.updateRegisterForm;
  payload: RegisterFormI;
}

export const updateForm = (data: RegisterFormI): UpdateFormActionI => {
  return {
    type: ActionTypes.updateRegisterForm,
    payload: data,
  };
};

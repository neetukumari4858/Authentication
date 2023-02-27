export interface FormStateType {
  id?: string;
  name?: string;
  email: string;
  password: string;
  userName?: string;
  userType?: string;
}

export interface FormActionType {
  type: string;
  field: string;
  payload: string;
}

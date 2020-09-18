export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export function login(username, password) {
  const action = {
    type: SIGN_IN,
    username,
    password,
  };
  return action;
}

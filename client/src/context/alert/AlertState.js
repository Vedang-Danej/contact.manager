import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import alertReducer from "./alertReducer";
import AlertContext from "./alertContext";
import { REMOVE_ALERT, SET_ALERT } from "../types";
const AlertState = (props) => {
  const initialState = [];
  const [state, dispatch] = useReducer(alertReducer, initialState);
  const setAlert = (msg, type) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { msg, type, id } });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
  };
  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
export default AlertState;

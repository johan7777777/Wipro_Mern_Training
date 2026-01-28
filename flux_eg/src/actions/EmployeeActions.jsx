import dispatcher from "../dispatcher/AppDispatcher";

export const addEmployee = (name) => {
  dispatcher.dispatch({
    type: "ADD_EMPLOYEE",
    payload: name
  });
};

export const removeEmployee = (index) => {
  dispatcher.dispatch({
    type: "REMOVE_EMPLOYEE",
    payload: index
  });
};
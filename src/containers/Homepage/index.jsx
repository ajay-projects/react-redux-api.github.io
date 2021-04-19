import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { makeSelectUsers } from "./selectors";
import Axios from "axios";
import { setUsers } from "./action";
import { UsersList } from "./userList";
const stateSelector = createSelector(makeSelectUsers, (users) => ({ users }));
const actionDispatch = (dispatch) => ({
  setUser: (users) => dispatch(setUsers(users)),
});

export const HomePage = (props) => {
  const { users } = useSelector(stateSelector);
  const { setUser } = actionDispatch(useDispatch());
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await Axios.get("https://reqres.in/api/users").catch((err)=>{console.log("err"+err);});
    setUser(response.data.data);
  };
  console.log("user"+JSON.stringify(users));

  return <div><UsersList/></div>;
};

import axios from "axios";
import React, { useEffect } from "react";
import { setUser } from "./action";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { makeSelectUser } from "./selectors";
import styled from "styled-components";
const UsersContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
`;
const UserImage = styled.div`
  width: 7em;
  height: 7em img {
    width: 100%;
    height: 100%;
  }
`;
const UserName = styled.h3`
  font-size: 20px;
  color: black;
  margin: 0;
`;
const UserEmail = styled.h3`
  font-size: 18px;
  color: gray;
  margin: 0;
`;
const stateSelector = createSelector(makeSelectUser, (user) =>( {
  user
}));
const actionDispatch = (dispatch) =>({
  setUser: (user) => dispatch(setUser(user))
});
export function UserPage(props) {
  const { user } = useSelector(stateSelector);
  const { setUser } = actionDispatch(useDispatch());
  const { userId } = useParams();
  const fetchUser = async (id) => {
    const response = await axios.get(`https://reqres.in/api/users/${id}`).catch((err)=>{console.log(err)});
    if (response) setUser(response.data.data);
  };
  useEffect(() => {
    if (userId && userId !== "") fetchUser(userId);
  }, [userId]);
  if (!user) return <div>Loading...</div>;
  return (
    <UsersContainer>
      <UserWrapper>
        <UserImage>
          <img src={user.avatar} alt="" />
        </UserImage>
        <UserName>
          {user.first_name}
          {user.last_name}
        </UserName>
        <UserEmail>{user.email}</UserEmail>
      </UserWrapper>
    </UsersContainer>
  );
}

import React from "react";
import { createSelector } from "reselect";
import { makeSelectUsers } from "./selectors";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const UsersContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
const stateSelector = createSelector(makeSelectUsers, (users) => ({ users }));
export function UsersList(props) {
  const { users } = useSelector(stateSelector);
  const isEmptyUsers = !users || (users && users.length === 0);
  const history = useHistory();
  const goToUserPage = (id) => {
    history.push(`/user/${id}`);
  };
  if (isEmptyUsers) return null;
  return (
    <UsersContainer>
      {users.map((user, index) => (
        <UserWrapper key={index} onClick={() => goToUserPage(user.id)}>
          <UserImage>
            <img src={user.avatar}></img>
          </UserImage>
          <UserName>
            {user.first_name} {user.last_name}
          </UserName>
        </UserWrapper>
      ))}
    </UsersContainer>
  );
}

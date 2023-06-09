import React, { useReducer, useEffect } from 'react';
const isServer = typeof window === 'undefined';

let reducer = (userOrg, newUserOrg) => {
  if (newUserOrg === null) {
    if (!isServer) {
      localStorage.removeItem('userCart');
    }
    return initialState;
  }
  return { ...userOrg, ...newUserOrg };
};

const initialState = {};
let localState;

if (!isServer) {
  localState = JSON.parse(localStorage.getItem('userCart'));
}

const UserOrgContext = React.createContext();

function UserOrgProvider(props) {
  const [userOrg, setUserOrg] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem('userCart', JSON.stringify(userOrg));
    }
  }, [userOrg]);

  return <UserOrgContext.Provider value={{ userCart: userOrg, setUserCart: setUserOrg }}>{props.children}</UserOrgContext.Provider>;
}

export { UserOrgContext as UserOrgContext, UserOrgProvider };

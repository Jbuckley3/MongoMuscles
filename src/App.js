import React, { useState, Fragment, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert';
import Header from './components/shared/Header';
import RequireAuth from './components/shared/RequireAuth';
import Home from './components/Home';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import ChangePassword from './components/auth/ChangePassword';
import ExerciseShow from './components/Exercises/ExerciseShow';
import ExerciseCreate from './components/Exercises/ExerciseCreate';
import './global.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [msgAlerts, setMsgAlerts] = useState([]);

  useEffect(() => {
    // Access localStorage
    const loggedInUser = localStorage.getItem('user');

    if (loggedInUser) {
      // Parse the JSON string
      const foundUser = JSON.parse(loggedInUser);
      // Set the saved user in state
      setUser(foundUser);
    }
  }, []);

  console.log('user in app', user);
  console.log('message alerts', msgAlerts);

  const clearUser = () => {
    console.log('clear user ran');
    // Clear the user saved in local storage
    localStorage.removeItem('user');
    // Clear the user saved in state
    setUser(null);
  };

  const deleteAlert = (id) => {
    setMsgAlerts((prevState) => {
      return prevState.filter((msg) => msg.id !== id);
    });
  };

  const msgAlert = ({ heading, message, variant }) => {
    const id = uuid();
    setMsgAlerts(() => {
      return [{ heading, message, variant, id }];
    });
  };

  return (
    <Fragment>
      <Header user={user} />
      <Routes>
        <Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
        <Route
          path='/sign-up'
          element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path='/sign-in'
          element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
        />
        <Route
          path='/sign-out'
          element={
            <RequireAuth user={user}>
              <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='/change-password'
          element={
            <RequireAuth user={user}>
              <ChangePassword msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='/create-exercise'
          element={
            <RequireAuth user={user}>
              <ExerciseCreate msgAlert={msgAlert} user={user} />
            </RequireAuth>
          }
        />
        <Route
          path='exercises/:exerciseId'
          element={<ExerciseShow user={user} msgAlert={msgAlert} />}
        />
      </Routes>
      {msgAlerts.map((msgAlert) => (
        <AutoDismissAlert
          key={msgAlert.id}
          heading={msgAlert.heading}
          variant={msgAlert.variant}
          message={msgAlert.message}
          id={msgAlert.id}
          deleteAlert={deleteAlert}
        />
      ))}
    </Fragment>
  );
};

export default App;

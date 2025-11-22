import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
// import PasswordReset from './pages/Authentication/PasswordReset';
import ForgotPassword from './pages/Authentication/ForgotPassword'


import KitchenFormElements from './pages/Form/KitchenFormElements';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import MenuFormElements from './pages/Form/MenuFormElements';
import DishForm from './pages/Form/AddItemForm';
import ConfirmForgotPassword from './pages/Authentication/ConfirmForgotPassword';
import MealFormElements from './pages/Form/MealFormElements';
import MealPlanFormElements from './pages/Form/MealPlanFormElements';
import ECommerce from './pages/Dashboard/ECommerce';
import DishFormElements from './pages/Form/DishFormElements';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  // Track authentication status
  const [auth, setAuth] = useState<boolean>(false);
  // console.log(auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // Simulate checking authentication status (e.g., checking localStorage)
    const isAuthenticated = localStorage.getItem('token') !== null;
    setAuth(isAuthenticated);
    setTimeout(() => setLoading(false), 1000);
    // console.log(auth);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !auth ? (
              <>
                <PageTitle title="Cabiot Eat | Kitchen" />
                <SignIn />
              </>
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/home"
          element={
            auth ? (
              <>
                <PageTitle title="Cabiot Eat | Home" />
                <ECommerce />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            auth ? (
              <>
                <PageTitle title="Cabiot Eat | Profile" />
                <Profile />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/kitchen"
          element={
            auth ? (
              <>
                <PageTitle title="Cabiot Eat | Kitchen" />
                <KitchenFormElements />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/menu"
          element={
            auth ? (
              <>
                <PageTitle title="Cabiot Eat | Menu" />
                <MenuFormElements />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/dish"
          element={
            auth ? (
              <>
                <PageTitle title="Cabiot Eat | Dish" />
                <DishFormElements />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/meal"
          element={
            auth ? (
              <>
                <PageTitle title="Cabiot Eat | Meal " />
                <MealFormElements />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/meal-plan"
          element={
            auth ? (
              <>
                <PageTitle title="Cabiot Eat | Meal Plan " />
                <MealPlanFormElements />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            auth ? (
              <>
                <PageTitle title="Cabiot Eat | Dashboard" />
                <Settings />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/forgot-password/"
          element={
            <>
              <PageTitle title="Cabiot Eat | Dashboard" />
              <ForgotPassword />
            </>
          }
        />

        <Route
          path="/forgot-password/confirm/:token"
          element={
              <>
                <PageTitle title="Cabiot Eat | Dashboard" />
                <ConfirmForgotPassword />
              </>
          }
        />


      </Routes>

    </>
  );
}

export default App;

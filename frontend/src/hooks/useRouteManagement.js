import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateState } from 'Store/Reducers/TBSlice';
import Service from 'Service/Service';

/**
 * Handles login and logout routes based on the isMe state.
 * If isMe is present, it will navigate to the home page.
 * If isMe is not present, it will navigate to the login page.
 * Also logs out the user if the token has expired.
 *
 * @param {boolean} isError
 * @param {string} errorMessage
 * @param {boolean} isErrorMad
 * @param {string} errorMessageMad
 * @param {object} isMe
 * @returns {object} An object with a handleLogout function.
 */
export const useRouteManagement = (isError, errorMessage, isErrorMad, errorMessageMad, isMe) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (isError && errorMessage === "Token has expired") {
  //     navigate("/login");
  //   }
  // }, [isError, errorMessage, navigate]);

  // useEffect(() => {
  //   if (isErrorMad && errorMessageMad === "Token has expired") {
  //     navigate("/login");
  //   }
  // }, [isErrorMad, errorMessageMad, navigate]);

  useEffect(() => {
    if (isMe?.email && isMe?.password) {
      if (location.pathname === "/login") {
        navigate("/");
      }
    } else {
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [isMe, location.pathname, navigate]);

  const handleLogout = () => {
    dispatch(updateState({ isError: false, errorMessage: "" }));
    setTimeout(() => {
      Service.logout();
    }, 1000);
    navigate("/login");
  };

  return {
    handleLogout
  };
}; 
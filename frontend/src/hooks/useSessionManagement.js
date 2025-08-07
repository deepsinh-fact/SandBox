import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateState, ReUsersignin } from "Store/Reducers/TBSlice";
import Service from "Service/Service";

export const useSessionManagement = (
  isError,
  errorMessage = "",
  isErrorMad,
  errorMessageMad = "",
  isMe
) => {
  const dispatch = useDispatch();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [sessionExpiredTimer, setSessionExpiredTimer] = useState(10);
  const sessionTimerRef = useRef(null);

  useEffect(() => {
    if (
      errorMessage.includes("Token") ||
      errorMessageMad.includes("Token")
    ) {
      setLoginModalOpen(true);
      setSessionExpiredTimer(10);
      dispatch(updateState({ isError: false, errorMessage: "" }));

      // Start countdown
      sessionTimerRef.current = setInterval(() => {
        setSessionExpiredTimer((prev) => {
          if (prev <= 1) {
            clearInterval(sessionTimerRef.current);
            handleLogout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isError, errorMessage, isErrorMad, errorMessageMad, dispatch]);

  useEffect(() => {
    if (!loginModalOpen) {
      clearInterval(sessionTimerRef.current);
      setSessionExpiredTimer(10);
    }
  }, [loginModalOpen]);

  const handleLogout = () => {
    dispatch(updateState({ isError: false, errorMessage: "" }));
    setTimeout(() => {
      Service.logout();
    }, 1000);
    setLoginModalOpen(false);
  };

  const handleLogin = () => {
    if (isMe?.email && isMe?.password) {
      clearInterval(sessionTimerRef.current);
      setSessionExpiredTimer(10);
      dispatch(updateState({ isError: false, errorMessage: "" }));
      dispatch(ReUsersignin({ email: isMe.email, password: isMe.password }));
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sessionTimerRef.current) {
        clearInterval(sessionTimerRef.current);
      }
    };
  }, []);

  return {
    loginModalOpen,
    setLoginModalOpen,
    sessionExpiredTimer,
    setSessionExpiredTimer,
    handleLogout,
    handleLogin,
  };
};

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNotificationContext } from '../createContextStore/NotificationContext';
import { updateState } from '../Store/Reducers/TBSlice';
import { updateStateMad } from '../Store/Reducers/MADSlice';
import Infodata from '../data/Infodata';

/**
 * Custom hook to handle notifications based on Redux state
 * @param {Object} tbState - TB reducer state
 * @param {Object} madState - MAD reducer state
 */
const useNotifications = (tbState, madState) => {
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();

  // Handle error notifications
  useEffect(() => {
    const { isError, errorMessage, Ewalletexpired } = tbState;
    const { isErrorMad, errorMessageMad } = madState;

    if (isError || isErrorMad) {
      // Skip notification for token expiration
      if (
        Ewalletexpired === "401" ||
        Ewalletexpired === "402" ||
        errorMessage === "Token has expired" ||
        errorMessageMad === "Token has expired"
      ) {
        return;
      }

      if (errorMessage === Infodata.InfoByApiFichar) {
        openNotification(
          "info",
          "Infomation",
          Infodata.InfoByApiFichar,
          true,
          true
        );
      } else {
        openNotification(
          "error",
          "Error",
          errorMessage || errorMessageMad || "Something went wrong",
          true,
          true
        );
      }

      // Reset error states
      dispatch(updateState({ Ewalletexpired: "" }));
      dispatch(updateState({ isError: false, errorMessage: "" }));
      dispatch(updateStateMad({ isErrorMad: false, errorMessageMad: "" }));
    }
  }, [
    tbState.isError,
    tbState.errorMessage,
    tbState.Ewalletexpired,
    madState.isErrorMad,
    madState.errorMessageMad,
    dispatch,
    openNotification
  ]);

  // Handle success notifications
  useEffect(() => {
    const { isUsersignin, isUpdateProfile, UpdateProfileData, successMessage } = tbState;
    const { isSaveMADReport, isSaveMADReportClientConfig, successMessageMad } = madState;

    // Login success notification
    if (isUsersignin) {
      openNotification("success", "Success", "Login Successfully", true, true);
      dispatch(updateState({ isUsersignin: false }));
    }

    if (successMessage) {
      openNotification("success", "Success", successMessage, true, true);
      dispatch(updateState({ successMessage: "" }));
    }
    // MAD report success notification
    if (isSaveMADReport || isSaveMADReportClientConfig) {
      openNotification(
        "success",
        "Success",
        successMessageMad || "Successfully Add Date",
        true,
        true
      );
      dispatch(
        updateStateMad({
          isSaveMADReport: false,
          isSaveMADReportClientConfig: false,
          successMessageMad: "",
        })
      );
    }

    // Profile update success notification
    if (isUpdateProfile) {
      openNotification(
        "success",
        "Success",
        UpdateProfileData?.successMessage || "Profile Updated Successfully",
        true,
        true
      );
      dispatch(updateState({ isUpdateProfile: false }));
    }
  }, [
    tbState.isUsersignin,
    tbState.isUpdateProfile,
    tbState.UpdateProfileData,
    tbState.successMessage,
    madState.isSaveMADReport,
    madState.isSaveMADReportClientConfig,
    madState.successMessageMad,
    dispatch,
    openNotification
  ]);
};

export default useNotifications; 
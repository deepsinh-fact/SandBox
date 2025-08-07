import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TBSelector } from "Store/Reducers/TBSlice";
import { updateState } from "Store/Reducers/TBSlice";

export const useThemeManagement = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector(TBSelector);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(updateState({ isDarkMode: savedTheme === "dark" }));
    }
  }, [dispatch]);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    dispatch(updateState({ isDarkMode: !isDarkMode }));
    localStorage.setItem("theme", newTheme);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return {
    isDarkMode,
    isSidebarOpen,
    toggleTheme,
    toggleSidebar,
  };
};

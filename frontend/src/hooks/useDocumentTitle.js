import { useEffect } from 'react';

/**
 * Custom hook to manage document title with tab visibility change effect
 * @param {string} title - The title to set when tab is active
 * @param {string} blurTitle - The title to set when tab is hidden
 */
const useDocumentTitle = (title = "Fact Portal", blurTitle = "Fact Portal") => {
  useEffect(() => {
    // Store original document title
    const originalTitle = document.title;
    
    // Set the active title initially
    document.title = title;
    
    // Handle visibility change
    const handleVisibilityChange = () => {
      document.title = document.hidden ? blurTitle : title;
    };

    // Add event listener
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Cleanup function
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle;
    };
  }, [title, blurTitle]);
};

export default useDocumentTitle; 
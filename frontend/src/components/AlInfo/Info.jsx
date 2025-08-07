import React from 'react';

const Info = ({ data }) => {
  // Mock info component - replace with your actual implementation
  React.useEffect(() => {
    // Set any default info data
    data({
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    });
  }, [data]);

  return null; // This component doesn't render anything visible
};

export default Info;
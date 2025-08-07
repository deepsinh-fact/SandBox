import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateState } from '../Store/Reducers/TBSlice';

/**
 * Custom hook to get user's geolocation and update Redux store
 * @param {Object} options - Geolocation API options
 * @param {boolean} options.enableHighAccuracy - Enable high accuracy for location
 * @param {number} options.timeout - Maximum time allowed to get location
 * @param {number} options.maximumAge - Maximum cached position age
 * @return {Object} - Location state with loading and error information
 */
const useGeolocation = (options = {}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    loading: true,
    error: null,
    location: null
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        loading: false,
        error: new Error('Geolocation is not supported by your browser'),
        location: null
      });
      return;
    }

    const geoOptions = {
      enableHighAccuracy: options.enableHighAccuracy || true,
      timeout: options.timeout || 10000,
      maximumAge: options.maximumAge || 0
    };

    const onSuccess = (position) => {
      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      // Update Redux store
      dispatch(updateState({ location }));

      // Update local state
      setState({
        loading: false,
        error: null,
        location
      });
    };

    const onError = (error) => {
      setState({
        loading: false,
        error,
        location: null
      });
    };

    // Get the current position
    const watchId = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      geoOptions
    );

    // Cleanup function to remove the watcher
    return () => navigator.geolocation.clearWatch(watchId);
  }, [dispatch, options.enableHighAccuracy, options.timeout, options.maximumAge]);

  return state;
};

export default useGeolocation; 
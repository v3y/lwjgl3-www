import { useState, useEffect } from 'react';

export function useGeolocation(options: PositionOptions) {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition, setError, options);
    const watchId = navigator.geolocation.watchPosition(setPosition, setError, options);
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [options]);

  return { position, error };
}

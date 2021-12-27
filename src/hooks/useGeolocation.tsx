import { useEffect, useState } from "react";

interface IPosition {
  latitude?: number;
  longitude?: number;
}

interface IError {
  message: string;
}

export function useGeolocation(options?: unknown) {
  const [position, setPosition] = useState<IPosition>(null);
  const [error, setError] = useState<IError>(null);

  function getPosition(position: GeolocationPosition) {
    setPosition({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(getPosition, setError, options);
  }

  useEffect(() => {
    getCurrentPosition();
  }, []);

  return { position, error };
}

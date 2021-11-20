import { useEffect } from 'react';

export function useWindowEvent(event: string, callback: () => void) {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
}

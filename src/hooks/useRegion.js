import { useEffect, useState } from 'react';

export function useRegion() {
  const [region, setRegion] = useState('GLOBAL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const detectRegion = async () => {
      try {
        const response = await fetch('https://api.country.is');
        const data = await response.json();
        if (!isActive) return;
        setRegion(data?.country === 'TR' ? 'TR' : 'GLOBAL');
      } catch (_error) {
        if (!isActive) return;
        setRegion('GLOBAL');
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    detectRegion();

    return () => {
      isActive = false;
    };
  }, []);

  return { region, isLoading };
}

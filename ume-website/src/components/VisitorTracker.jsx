import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisitor } from '../services/api';

export default function VisitorTracker() {
  const location = useLocation();

  useEffect(() => {
    trackVisitor(location.pathname);
  }, [location.pathname]);

  return null;
}
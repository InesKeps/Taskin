import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const AppEntry = () => {
  const navigate = useNavigate();
  
  localStorage.setItem("isRegistered", "false");
  
  useEffect(() => {
    const isRegistered = localStorage.getItem('isRegistered');
    if (isRegistered === 'true') {
      navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  }, []);

  return null;
};

export default AppEntry;
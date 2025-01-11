import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle Google Sign-In
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);

      // Fetch the user info
      const user = result.user;
      console.log('User signed in:', user);

      // Optionally: Store user data in Firestore here (if needed)

      // Redirect to /landing page after successful login
      navigate('/landing');

    } catch (error) {
      console.error("Login failed:", error);

      // Handle error
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error details: ${errorCode}, ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login</h1>
      <button onClick={signInWithGoogle} disabled={loading} style={buttonStyle}>
        {loading ? 'Logging in...' : 'Login with Google'}
      </button>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#4285F4',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default LoginPage;
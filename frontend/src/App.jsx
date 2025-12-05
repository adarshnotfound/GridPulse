import { useEffect, useState } from 'react';
import api from './api/axios'; // Import the helper you just created

function App() {
  const [message, setMessage] = useState('Loading...');

  // useEffect runs this code once when the page loads
  useEffect(() => {
    // This tells React: "Go to localhost:5000 and get the home page"
    api.get('/')
      .then((response) => {
        // If successful, log the data from the backend
        console.log("Backend Response:", response.data); 
        setMessage(response.data); // Display it on screen
      })
      .catch((error) => {
        // If it fails, log the error
        console.error("Error connecting to backend:", error);
        setMessage("Connection Failed ❌");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-4xl font-bold">
      {/* This should say "GridPulse Online" if it works */}
      {message} 
    </div>
  );
}

export default App;
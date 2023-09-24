import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="dashboard">
      {userData ? (
        <div>
          <h1>Welcome, {userData.display_name}!</h1>
          <p>Email: {userData.email}</p>
          <p>Country: {userData.country}</p>
          <img src={userData.images[0]?.url} alt="User" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Dashboard;

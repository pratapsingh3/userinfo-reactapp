import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );

  const fetchData = useCallback(async () => {
    try {
      const {
        data: {
          results: [
            {
              name: { first, last },
              email
            }
          ]
        }
      } = await axios.get("https://randomuser.me/api/");
      const newUser = { name: `${first} ${last}`, email };
      if (JSON.stringify(user) !== JSON.stringify(newUser)) {
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    if (!user.name && !user.email) {
      fetchData();
    }
  }, [fetchData, user]);

  return (
    <div className="container">
      <h1 className="user-head">USER INFO</h1>
      {user.name ? (
        <div className="user-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
      <button className="refresh" onClick={fetchData}>
        Refresh
      </button>
    </div>
  );
}

export default App;

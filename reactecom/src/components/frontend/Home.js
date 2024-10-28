import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/frontend/Navbar";
import axios from "../../lib/axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("api/user")
      .then((res) => {
        // console.log(res.data);
        if (res.status === 200) {
          setUsers(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <h1>home fontend</h1>
      <ul>
        {users?.length > 0 &&
          users.map((user, index) => <li key={index}>{user.email}</li>)}
      </ul>
    </>
  );
};

export default Home;

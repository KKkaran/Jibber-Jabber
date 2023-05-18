import React from "react";
import Auth from "../utils/auth";
import Chats from "./Chats";
import "./home.css"

import { Link } from 'react-router-dom'
function Home() {

  if (Auth.loggedIn()) {
  } else {
    return (
      <>
        <h2>You need to be logged in to see this page. Use the button below to sign up or log in!</h2>
        <button>
          <Link to="/signup">Sign Up</Link>
        </button>
        <button>
          <Link to="/login">Login</Link>
        </button>
      </>
    )
  }

  return (
    <div className="dashboard">
      {Auth.loggedIn() ? <Chats /> : ""}
    </div>
  )
}

export default Home

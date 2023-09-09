import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { auth, useAuth } from '../../firebase';
import {useUserData} from "../../users/userUtils"; // Import your Firebase authentication module here

export default function Navbar() {
  const user = useAuth(); // Replace with your Firebase authentication hook
  const { userType, email, username } = useUserData(user);

  useEffect(() => {
    // You can use the userType, email, and username here
    console.log('User Type:', userType);
    console.log('Email:', email);
    console.log('Username:', username);
  }, [userType, email, username]);


  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#171717' }}>
        <div className="container">
          <a className="navbar-brand" href="#" style={{ textTransform: 'uppercase', fontWeight: '700', fontSize: '26px' }}>
            Medi Vault
          </a>
          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent" >
            <ul className="navbar-nav ml-auto">
              {user ? (
                  <div className="d-flex">
                    <div className="d-block">
                      <h5 style={{ color: '#cdcdcd', fontWeight: '700', fontSize: '15px', margin: '0' }}>{username}</h5>
                      <span className="ms-2" style={{ textTransform: 'uppercase', color: '#989898', fontWeight: '500', fontSize: '13px', margin: '0' }}>
                       {userType}
                      </span>
                    </div>

                    <li className="nav-item dropdown">
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                      <img
                          src="http://www.gravatar.com/avatar/9ce79c699d1e5a2b5db63527abdb2a2f"
                          alt="User Avatar"
                          className="rounded-circle"
                          width="30"
                          height="30"
                      />

                    </a>
                    <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="navbarDropdown">
                      <li>
                        <span className="dropdown-item">Email: {email}</span>
                      </li>
                      <li>
                        <span className="dropdown-item">Expiry: {user.expiry}</span>
                      </li>
                      <li>
                        <a href="https://gotytv.com/premium" className="dropdown-item">
                          Buy Plan
                        </a>
                      </li>
                      <li>
                        <a href="https://gotytv.com/profile" className="dropdown-item">
                          My Profile
                        </a>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                  </div>
              ) : (
                  <div>
                    <li className="nav-item">
                      <Link className="btn btn-danger nav-link" to="/users/login">
                        User Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="btn btn-outline-light nav-link" to="/users/register">
                        Add User
                      </Link>
                    </li>
                  </div>
              )}
            </ul>
          </div>
        </div>
      </nav>
  );
}

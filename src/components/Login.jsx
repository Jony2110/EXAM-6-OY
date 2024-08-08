import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Login failed");
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("err:", err);
      });
  }

  return (
    <div className={styles.box}>
      <img
        className={styles.img}
        src="./img/desktop-wallpaper-sith-warrior-group-sith.jpg"
        alt="Not photo"
      />
     <div>
     <img className={styles.logo} src="./img/UI-Unicorn-Logo.svg" alt="Not foto" />
        <h1>Nice to see you again</h1>
     <form className={styles.form} onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Enter your Email ....."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password ....."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button className={styles.btn} type="submit">
          LOGIN
        </button>
        <span className={styles.spann}></span>
        <Link to="/registr">
          <button className={styles.btn} type="button">
            REGISTER
          </button>
        </Link>
      </form>
     </div>
    </div>
  );
}

export default Login;

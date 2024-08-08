import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './registr.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Registr() {
  const [showPassword, setShowPassword] = useState(false);
 
  const userNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const urlRef = useRef();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const user = {
      name: userNameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value.trim(),
      avatar: urlRef.current.value.trim(),
    };

    fetch("https://api.escuelajs.co/api/v1/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hatolik yuz berdi bosh qatan urinib koring');
      }
      return response.json();
    })
    .then(data => {
      if (data.id) {
        
        navigate('/login');
      } 
    })
    .catch(err => {
      console.error('Error:', err);
      
    });
  }

  return (
    <div className={styles.box}>
      <img className={styles.img} src="./img/215543.jpg" alt="Not photo" />
     <div>
     <img className={styles.logo} src="./img/UI-Unicorn-Logo.svg" alt="Not foto" />
     <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.h1}>Nice to see you again</h1>
        
        
        <input
          ref={userNameRef}
          type="text"
          placeholder="Enter your UserName ....."
        />
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter your Email ....."
        />
        <div className={styles.passwordContainer}>
          <input
            ref={passwordRef}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your Password ....."
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <input
          ref={urlRef}
          type="url"
          placeholder="Enter your Url ....."
        />
        <button className={styles.btn} type="submit">REGISTER</button>
        <span className={styles.spann}></span>
        <Link to="/login">
          <button className={styles.btn} type="button">LOGIN</button>
        </Link>
      </form>
     </div>
    </div>
  );
}

export default Registr;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login1() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("Hoşgeldiniz.");
  const navigate = useNavigate();

  const correctUsername = "Muhammed";
  const correctPassword = "1234";
  const API_URL = "https://private-f738ac-itoapi3.apiary-mock.com/login";

  const myButtonClick = async () => {
    if (!username || !password) {
      alert("Kullanıcı adı ve şifre boş bırakılamaz.");
      return;
    }

    // API'ye POST isteği gönder (yanıtı önemseme)
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
    } catch (error) {
      console.error("API isteği hatası:", error);
    }

    // Yalnızca belirlenen kullanıcı adı ve şifreyle giriş yapılmasına izin ver
    if (username === correctUsername && password === correctPassword) {
      localStorage.setItem("userName", username);
      alert("Giriş başarılı!");
      navigate("/Formcargo");
    } else {
      alert("Hatalı kullanıcı adı veya şifre!");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setWelcomeMessage(`Hoşgeldiniz ${e.target.value}`);
  };

  return (
    <div>
      <div className="background-image" />
      <div className="login-form">
        <div className="form-title">
          <h3>{welcomeMessage}</h3>
          <p>Lütfen hesabınıza giriş yapınız.</p>
          <div className="tabs">
            <button
              className="tab-button"
              id="login-tab"
              onClick={(event) => openTab(event, "login")}
            >
              Giriş
            </button>
          </div>
        </div>
        <div id="login" className="tab-content">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Kullanıcı Adı"
              required
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Şifre"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <motion.button
              type="button"
              className="btn btn-primary btn-block"
              onClick={myButtonClick}
              whileTap={{ backgroundColor: "red", y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              onHoverStart={() => {
                const notification = document.createElement("div");
                notification.innerText =
                  "Kullanıcı Adı: Muhammed  / Şifre : 1234";
                notification.style.position = "fixed";
                notification.style.top = "10px";
                notification.style.left = "10px";
                notification.style.backgroundColor = "green";
                notification.style.color = "white";
                notification.style.padding = "10px";
                notification.style.borderRadius = "5px";
                document.body.appendChild(notification);
                setTimeout(() => {
                  document.body.removeChild(notification);
                }, 2000);
              }}
            >
              Giriş Yap
            </motion.button>
          </div>
          <div className="form-group">
            <div className="checkbox">
              <label>
                <input type="checkbox" name="remember" /> Beni Hatırla
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Handles the tab switching functionality by showing the selected tab's content
 * and highlighting the corresponding tab button.
 *
 * @param {Event} event - The event object triggered by clicking a tab button.
 * @param {string} tabName - The ID of the tab content to be displayed.
 */
function openTab(event, tabName) {
  var i, tabContent, tabButtons;

  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].classList.remove("active-tab");
  }

  tabButtons = document.getElementsByClassName("tab-button");
  for (i = 0; i < tabButtons.length; i++) {
    tabButtons[i].classList.remove("active");
  }

  document.getElementById(tabName).classList.add("active-tab");
  event.currentTarget.classList.add("active");
}

export default Login1;

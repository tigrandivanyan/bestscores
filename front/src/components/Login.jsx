import React, { useEffect, useState } from "react";
import "./Login.scss";
import logo from "../images/logo.png";
import { useSearchParams } from "react-router-dom";
import { request } from "../request";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [showToken, setShowToken] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await request.post("/user/login", {
                email,
                password,
            });
            setToken(response.data);
            localStorage.setItem("token", token);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    useEffect(() => {
        if (token) {
            setShowToken(true);
        }
    }, [token]);

    const download_link = "https://bestscores.sandia.site/api/user/download"

    return (
        <div className="login-form">
            <img src={logo} alt="BestScores Logo" className="logo" />
            {!showToken && !localStorage.getItem("token") ? (
                <>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                </>
            ) : (
                <div>
                    <h2>Your Token</h2>
                    <b>{token || localStorage.getItem("token")}</b>
                    <div>
                        <h3>English:</h3>
                        <p>
                            Welcome to Our Website!
                            <br />
                            Thank you for visiting. To get started, simply click the button below to download the program. The program is packed in a ZIP folder containing an executable file (.exe) for Windows.
                            <br />
                            Installation Instructions:
                            <br />
                            1. Download the ZIP folder.
                            <br />
                            2. Extract the contents of the ZIP folder to a folder of your choice.
                            <br />
                            3. Double-click the .exe file to run the program.
                            <br />
                            4. Follow the on-screen instructions to complete the installation.
                            <br />
                            Enjoy using the program!
                        </p>
                        <a href={download_link} target="_blank" rel="noopener noreferrer">
                            <button>Download Program</button>
                        </a>
                    </div>
                    <hr />
                    <div>
                        <h3>Russian (Русский):</h3>
                        <p>
                            Добро пожаловать на наш сайт!
                            <br />
                            Спасибо, что посетили нас. Чтобы начать, просто нажмите кнопку ниже для загрузки программы. Программа упакована в ZIP-архив, который содержит исполняемый файл (.exe) для Windows.
                            <br />
                            Инструкция по установке:
                            <br />
                            1. Скачайте ZIP-архив.
                            <br />
                            2. Распакуйте содержимое архива в выбранную вами папку.
                            <br />
                            3. Дважды щелкните по файлу .exe для запуска программы.
                            <br />
                            4. Следуйте инструкциям на экране для завершения установки.
                            <br />
                            Приятного использования программы!
                        </p>
                        <a href={download_link} target="_blank" rel="noopener noreferrer">
                            <button>Скачать программу</button>
                        </a>
                    </div>
                    <hr />
                    <div>
                        <h3>Polish (Polski):</h3>
                        <p>
                            Witaj na naszej stronie!
                            <br />
                            Dziękujemy za odwiedzenie naszej strony. Aby rozpocząć, kliknij przycisk poniżej, aby pobrać program. Program jest zapakowany w folder ZIP zawierający plik wykonywalny (.exe) dla systemu Windows.
                            <br />
                            Instrukcje instalacji:
                            <br />
                            1. Pobierz folder ZIP.
                            <br />
                            2. Rozpakuj zawartość folderu ZIP do wybranej lokalizacji.
                            <br />
                            3. Kliknij dwukrotnie plik .exe, aby uruchomić program.
                            <br />
                            4. Postępuj zgodnie z instrukcjami na ekranie, aby zakończyć instalację.
                            <br />
                            Miłego korzystania z programu!
                        </p>
                        <a href={download_link} target="_blank" rel="noopener noreferrer">
                            <button>Pobierz program</button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;

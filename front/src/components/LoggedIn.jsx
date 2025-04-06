import logo from "../images/logo.png";
import "./LoggedIn.scss";

export const LoggedIn = ({ token, email }) => {
    const logout = () => {
        window.localStorage.removeItem("token");
        window.location.reload();
    };
    return (
        <div className="main">
            <div className="block">
                <img src={logo} alt="" />
                <button onClick={logout}>Log out</button>
                <div className="contents">
                    <div className="left">
                        <h2>Token:</h2>
                        <b>{token || localStorage.getItem("token")}</b>
                        <div>
                            <h3>English:</h3>
                            <p>
                                <h3>Welcome to BestScores! 🎉</h3>
                                Thank you for visiting, <br />
                                <br />
                                To get started, above you see your token, please write to our admin on Telegram <b>@bestscores_admin</b> to get started. 📲
                                <br />
                                <br />
                                1. He will ask for your email and to install AnyDesk 🖥️
                                <br />
                                2. He will ask for your AnyDesk ID 🆔
                                <br />
                                3. The program will be installed on your computer where you can choose games and automatically click wherever you want 🎮
                                <br />
                                <br />
                                Do not share your token with anyone (even our administrator) you might lose your access permanently if you do so 🔒
                                <br />
                                Enjoy using the program! 🚀
                            </p>
                        </div>
                        <hr />
                        <div>
                            <h3>Polish (Polski):</h3>
                            <p>
                                <h3>Witaj w BestScores! 🎉</h3>
                                Dziękujemy za odwiedzenie naszej strony. <br />
                                Aby rozpocząć, powyżej znajdziesz swój token, proszę napisz do naszego administratora na Telegramie <b>@bestscores_admin</b> aby rozpocząć. 📲
                                <br />
                                <br />
                                1. Poprosi o twój email i instalację AnyDesk 🖥️
                                <br />
                                2. Poprosi o twój ID w AnyDesk 🆔
                                <br />
                                3. Program zostanie zainstalowany na twoim komputerze, gdzie będziesz mógł wybierać gry i automatycznie klikać w dowolnym miejscu 🎮
                                <br />
                                <br />
                                Nie udostępniaj swojego tokena nikomu (nawet naszemu administratorowi), inaczej możesz stracić dostęp na zawsze 🔒
                                <br />
                                Miłego korzystania z programu! 🚀
                            </p>
                        </div>
                        <hr />
                        <div>
                            <h3>Russian (Русский):</h3>
                            <p>
                                <h3>Добро пожаловать в BestScores! 🎉</h3>
                                Спасибо, что посетили нас. <br />
                                Чтобы начать, выше вы видите ваш токен, пожалуйста, напишите нашему администратору в Telegram <b>@bestscores_admin</b> для начала. 📲
                                <br />
                                <br />
                                1. Он попросит ваш email и установить AnyDesk 🖥️
                                <br />
                                2. Он попросит ваш ID AnyDesk 🆔
                                <br />
                                3. Программа будет установлена на вашем компьютере, где вы сможете выбирать игры и автоматически кликать в любом месте 🎮
                                <br />
                                <br />
                                Не делитесь своим токеном с кем-либо (даже с нашим администратором), иначе вы можете потерять доступ навсегда 🔒
                                <br />
                                Приятного использования программы! 🚀
                            </p>
                        </div>
                    </div>
                    <div className="right">
                        <table>
                            <thead>
                                <tr>
                                    <td>Event</td>
                                    <td>StartTime UTC+2</td>
                                </tr>
                            </thead>
                            <tr>
                                <td>Cristina Bucsa / Sara Sorribes Tormo - Irina Bara / Laura Pigossi</td>
                                <td>06.04 17:00</td>
                            </tr>
                            <tr>
                                <td>Katarzyna Kawa - Camila Osorio</td>
                                <td>06.04 19:00</td>
                            </tr>
                            <tr>
                                <td>Jelena Ostapenko / Erin Routliffe - Caroline Dolehide / Desirae Krawczyk</td>
                                <td>06.04 18:00</td>
                            </tr>
                            <tr>
                                <td>Jessica Pegula - Sofia Kenin</td>
                                <td>06.04 20:30</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

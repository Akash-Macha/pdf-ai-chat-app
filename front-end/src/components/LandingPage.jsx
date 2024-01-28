import Header from "./Header/Header";
import Login from "./LoginScreen/Login";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Login />
      <p className="read-the-docs">
        Made with love ♥ by Akash Macha
        {/* Made with love 💓 by Akash Macha */}
      </p>
    </>
  )
};

export default LandingPage;
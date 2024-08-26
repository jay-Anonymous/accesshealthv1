import React from "react";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Routers from "./routes/Routers";
import "./app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
        <ToastContainer
          autoClose={3000}
          theme="dark"
          position="top-right"
          closeOnClick
          pauseOnHover={false}
          style={{ width: "100%", maxWidth: "350px" }}
        />
      </main>
      <Footer />
    </>
  );
};

export default App;

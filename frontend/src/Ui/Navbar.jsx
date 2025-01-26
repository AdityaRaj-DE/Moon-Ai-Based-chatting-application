import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { Link, useLocation } from "react-router-dom";
import Calculator from "./Calculator";
import Calendar from "./Calendar";
import ColorModeSwitcher from "./ColorModeSwicher";

const Navbar = () => {
  const [oncalc, setOncalc] = useState(false);
  const [oncald, setOncald] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const setOncaculate = () => {
    setOncalc(!oncalc);
  };
  const setOncalender = () => {
    setOncald(!oncald);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { setUser } = useContext(UserContext);
  const location = useLocation();

  // Hide navbar on login and register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-[#eaeaea] dark:bg-zinc-800 shadow-lg"
      >
        <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl text-zinc-700 dark:text-zinc-200`}></i>
      </button>

      {/* Mobile Menu Modal */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
          <div className="bg-white dark:bg-zinc-800 w-4/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-zinc-700 dark:text-zinc-200">Menu</h2>
              <button 
                onClick={toggleMenu}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <Link 
                to="/" 
                className="flex items-center space-x-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="ri-home-line text-2xl text-zinc-700 dark:text-zinc-200"></i>
                <span className="text-zinc-700 dark:text-zinc-200">Home</span>
              </Link>
              
              <Link 
                to="/about" 
                className="flex items-center space-x-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="ri-information-line text-2xl text-zinc-700 dark:text-zinc-200"></i>
                <span className="text-zinc-700 dark:text-zinc-200">About</span>
              </Link>
              
  
              
             
              
              
              
              <Link 
                to="/login" 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }} 
                className="flex items-center space-x-3 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg"
              >
                <i className="ri-logout-box-line text-2xl text-zinc-700 dark:text-zinc-200"></i>
                <span className="text-zinc-700 dark:text-zinc-200">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex h-screen z-1 w-20 bg-transparent flex-col-reverse items-center py-4 gap-7">
        <Link to="/login">
          <div className="h-32 flex-wrap-reverse flex">
            <button
              onClick={handleLogout}
              className="h-12 rounded-xl bg-[#eaeaea] w-12 shadow-xl flex items-center justify-center"
            >
              <i className="ri-logout-box-line h-10 w-10 text-2xl p-1 bg-white rounded-lg text-zinc-700"></i>
            </button>
          </div>
        </Link>
        <div className="h-28 w-12 flex items-center rounded-xl bg-[#eaeaea] shadow-md justify-between flex-col">
          <div className="fixed left-20 bottom-10 z-1000">
            {oncalc ? (
              <div className="">
                <Calculator />
              </div>
            ) : (
              <div></div>
            )}
            {oncald ? (
              <div className="">
                <Calendar />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          
          <button
            onClick={setOncaculate}
            className="h-10 w-10 m-1 flex items-center justify-center bg-white rounded-lg"
          >
            <i className="ri-calculator-line text-2xl text-zinc-700"></i>
          </button>
          <button
            onClick={setOncalender}
            className="h-10 w-10 m-1 flex items-center justify-center bg-white rounded-lg"
          >
            <i className="ri-calendar-todo-line text-2xl text-zinc-700"></i>
          </button>
        </div>
        <div className="h-28 w-12 flex items-center rounded-xl bg-[#eaeaea] shadow-md justify-between flex-col">
          <Link to="/">
            <button className="h-10 w-10 m-1 flex items-center justify-center bg-white rounded-lg">
              <i className="ri-home-line text-2xl text-zinc-700"></i>
            </button>
          </Link>
          <Link to="/about">
            <button className="h-10 w-10 m-1 flex items-center justify-center bg-white rounded-lg">
              <i className="ri-information-line text-2xl text-zinc-700"></i>
            </button>
          </Link>
        </div>
        <div className="h-12 flex flex-col justify-between bg-[#eaeaea] rounded-xl">
          <ColorModeSwitcher/>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";

const ColorModeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Toggle the dark mode class
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="text-xs bg-[#eaeaea] text-black dark:bg-[#242424] dark:text-white py-1 rounded-lg flex items-center">
      <button
        onClick={handleThemeSwitch}
        className="text-xs px-3 py-1 flex items-center justify-center "
        aria-label="Switch to Light Mode"
      >
        {theme === "dark" ? (
          <i className="ri-sun-line text-2xl text-zinc-100"></i>
        ) : (
          <i className="ri-moon-line text-2xl text-zinc-700"></i>
        )}
      </button>
    </div>
  );
};

export default ColorModeSwitcher;

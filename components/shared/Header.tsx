import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  gradient?: boolean;
}

const Header = ({ title, subtitle, center = false, gradient = true }: HeaderProps) => {
  return (
    <header
      className={`flex flex-col gap-4 p-6 bg-black text-white rounded-lg shadow-lg ${
        center ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <h2
        className={`text-4xl font-extrabold ${
          gradient
            ? "bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text text-transparent"
            : "text-white"
        }`}
      >
        {title}
      </h2>

      {subtitle && (
        <p className="text-xl font-normal text-gray-300 mt-2 hover:text-gray-100 transition-all duration-300">
          {subtitle}
        </p>
      )}
    </header>
  );
};

export default Header;

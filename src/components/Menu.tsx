import React from "react";

interface MenuProps {
    children: React.ReactNode;
}

const Menu: React.FC<MenuProps> = ({ children }) => {
    return (
        <div
            className="
        w-full max-w
        p-8 
        backdrop-blur-md
        border border-white/20
        rounded-xl shadow-2xl
      "
        >
            <div className="flex flex-col space-y-4">{children}</div>
        </div>
    );
};

export default Menu;

import React from "react";

const Spinner = () => {
    return (
        <div className="w-24 h-24 relative animate-spin linear duration-2500">
            {[...Array(6)].map((_, i) => (
                <div 
                    key={i}
                    className="w-full h-full absolute left-0 top-0 animate-pulse ease-in-out delay-100 transform rotate-360"
                    style={{ animationDelay: `-${1.2 - i * 0.1}s` }}
                >
                    <div
                        className="w-1/4 h-1/4 bg-green-500 rounded-full animate-pulse ease-in-out delay-100"
                        style={{ animationDelay: `-${1.2 - i * 0.1}s` }}
                    />
                </div>
            ))}
        </div>
    );
};

export default Spinner;

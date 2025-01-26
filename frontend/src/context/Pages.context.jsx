import React, { createContext, useState } from 'react';

// Create the PageContext
export const PageContext = createContext();

// Create a provider component
export const PageProvider = ({ children }) => {
    const [page, setPage] = useState(0);

    return (
        <PageContext.Provider value={{ page, setPage }}>
            {children}
        </PageContext.Provider>
    );
};

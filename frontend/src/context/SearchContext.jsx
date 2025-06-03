import React, { createContext, useContext, useState } from 'react'

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchText, setSearchText] = useState('');
    const [type, setType] = useState(null);
    const [capacity, setCapacity] = useState(null);
    const [sortby, setSortby] = useState(null);

    return (
        <SearchContext.Provider value={{ searchText, setSearchText, type, setType, capacity, setCapacity, sortby, setSortby }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => useContext(SearchContext);
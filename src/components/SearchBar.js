import React, { useState, useEffect } from 'react';

const SearchBar = () => {
    const [text, setText] = useState('');

    const handleInputChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div className='search-container'>
            <div className='search'>
                <input
                    className='search-bar'
                    type='search'
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};

export default SearchBar;

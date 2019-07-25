import React from 'react'

const Filter = ({ search, handleSearch }) => {
    return (
        <label>
            Search: 
            <input type='text'
                   value={search}
                   onChange={handleSearch}
            />
        </label>
    )
}

export default Filter

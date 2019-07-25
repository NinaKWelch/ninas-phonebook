import React from 'react'

const Person = ({ person, removePerson }) => {
    const buttonStyle = {
        marginLeft: 10
    }

    return(
        <li style={{ paddingBottom: 10 }}>
            {person.name}: {person.number}

            <button onClick={() => removePerson(person.id, person.name)}
                    style={buttonStyle}>
                Delete
            </button>
        </li>
    )
}

export default Person

import React from 'react'
import Person from './Person'

const Persons = ({ persons, removePerson }) => {
  const listStyle = {
    listStyle: 'none',
    paddingLeft: 0 
  }

  const rows = () => (
    persons.map(person => 
      <Person key={person.id}
              person={person}
              removePerson={removePerson}
      />
    )
  )
  
  return <ul style={listStyle}>{rows()}</ul>
}

export default Persons

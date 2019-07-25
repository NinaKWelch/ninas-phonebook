import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ color, setColor ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        showMessage(`Phonebook unavailable`, 'red')
      })    
  }, [])

  const personsToShow = newSearch === ''
  ? persons
  : persons.filter(person => {
    let personName = person.name.toLowerCase()
    let searchTerm = newSearch.toLowerCase()

    return personName.match(searchTerm)  
  })

  const addPerson = event => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const samePersonSameNumber = persons.some(
      person => person.name === newName && person.number === newNumber
    )

    const samePerson = persons.find(person => person.name === newName)
    
    if (samePersonSameNumber) {
      showMessage(`${newName} has already been added to phonebook`, 'green')
    } else if (samePerson) {
      changeNumber(samePerson, newNumber)
    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        showMessage(`${personObject.name} has been added to phonebook`, 'green')
        setPersons(persons.concat(returnedPerson))
      })
      .catch(error => {
        showMessage(`Attempt failed`, 'red')
      }) 
    }
    
    setNewName('')
    setNewNumber('')
    setNewSearch('')
  }

  const changeNumber = (person, number) => {
    const confirmChangeNumber = window.confirm(
      `${person.name} has already been added to phonebook, replace the old number with a new one?`
    )

    if (confirmChangeNumber) {
      const id = person.id
      const changedPerson = { ...person, number: number }

      personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        showMessage(`${changedPerson.name}'s number has been updated`, 'green')
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      .catch(error => {
        showMessage(`${changedPerson.name} has already been removed form phonebook`, 'red')
        setPersons(persons.filter(person => person.id !== id))
      })    
    }
  }

  const removePerson = (id, name) => {
    const confirmRemovePerson = window.confirm(`Delete ${name}?`)

    if (confirmRemovePerson) {
      personService
        .remove(id)
        .then(() => {
          showMessage(`${name} has been deleted from phonebook`, 'green')  
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          showMessage(`Attempt failed`, 'red')
        }) 
    }
  }

  const showMessage = (content, color) => {
    setMessage(content)
    setColor(color)

    setTimeout(() => {
      setMessage(null)
      setColor('')
    }, 5000)   
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} color={color} />

      <Filter search={newSearch} 
              handleSearch={e => setNewSearch(e.target.value)} 
      />

      <h2>Add new person</h2>

      <PersonForm addPerson={addPerson}
                  name={newName} 
                  number={newNumber} 
                  addName={e => setNewName(e.target.value)} 
                  addNumber={e => setNewNumber(e.target.value)}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow}
               removePerson={removePerson}
      />
    </div>
  )
}

export default App
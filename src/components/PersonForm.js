import React from 'react'

const PersonForm = ({ addPerson, name, number, addName, addNumber }) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        <label>
          Name:
          <input type='text'
                 value={name} 
                 onChange={addName}
                 required
          />
        </label>
      </div>
      
      <div>
        <label>
          Number:
          <input type='text'
                 value={number} 
                 onChange={addNumber}
                 required
          />
        </label>
      </div>

      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm

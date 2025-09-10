import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/Persons"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState()
  const [errorNotif, setErrorNotif] = useState(false)

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])
  

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  //Use time in seconds
  const showNotification = (message, time) => {
    console.log("Show notification", message, time)
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
      setErrorNotif(false)
    }, time * 1000)
  }

  const deletePerson = (id) => {
    if (window.confirm("Do you want to delete this person?")){
      personService.deletePerson(id)
      .then(data => {
        setPersons(data)
        console.log("deleted")
        showNotification("Person removed sucessfully!", 3)
      }).catch(error => {
        setErrorNotif(true)
        showNotification("Person has already been removed!", 3)
      })
    }
    
  }

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)

    if(person !== undefined){
      if(person.number !== newNumber){
        personService.editNumber(person.id, {...person, number: newNumber})
        .then(data => {
          setPersons(data)
          console.log("adding people")
          showNotification(`Changed ${person.name} number to ${newNumber}`, 3)
        }).catch(err => {
          setErrorNotif(true)
          showNotification(`Couldn't change ${person.name} number!`, 3)
        })
      }else{
        alert(`${newName} already exists with this number!`)
      }
    }else{
      personService.addPerson(newName, newNumber)
      .then(data => {
        setPersons(data)
        showNotification(`Added ${newName}`, 3)
      }).catch(err => {
        setErrorNotif(true)
        showNotification(`${newName} couldn't be added!`, 3)
      })
      
    }
  }


  const personsToShow = filter 
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      {notification ? <Notification message={notification} error={errorNotif} /> : <></>}
      <Filter filter={filter} handler={handleFilterChange}/>
      <h3>Add a new person</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )

}

export default App
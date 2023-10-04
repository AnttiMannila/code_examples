import { useEffect, useState } from "react";
import Persons from './components/Persons.js'
import FilterPersons from "./components/Filterpersons.js";
import AddPerson from "./components/Addperson.js";
import phoneBook from "./services/phonebook.js";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [findName, setFindname] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('using effect')
    phoneBook.getAll().then(response => {setPersons(response.data)})}, [])
       
  const handleNewPerson = (event) => {
    setNewName(event.target.value)
    }
   
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFindPerson = (event) => {
    setFindname(event.target.value)
  }
    
  const searchByName = findName 
  ? persons.filter(person => person.name?.toLowerCase().includes(findName?.toLowerCase())) 
  : persons.filter(person => person.name === findName)

  const deleteButton = (person) => {
    console.log(person.id)
    const confirm1 = window.confirm(`delete ${person.name}`)
    
    if (confirm1 === true)  {
      return(
      phoneBook
        .del(person.id)
        .then(response => {
        console.log(`${person.name} deleted ${response.data}`)
        phoneBook
        .getAll().then(response => {setPersons(response.data)})
        setMessage(`${person.name} deleted`)
        setTimeout(() =>{
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(`Information of ${person.name} has already removed from the server`)
        setTimeout(() =>{
          setErrorMessage(null)
        }, 5000)
      })
     )
    } else {
      return(
      console.log('canceled')
     )
    }   
   } 

   const Notification =({message}) => {
    if (message === null) {
      return null
    }
    return(
      <div className="done">
        {message}
      </div>
    )
   }

   const FailedNotification = ({errorMessage}) =>{
    if (errorMessage === null) {
      return null
    }
    return(
    <div className="error">
      {errorMessage}
    </div>
      )
    }

    return(
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <FailedNotification errorMessage={errorMessage}/>
      <FilterPersons findName={findName} handleFindPerson={handleFindPerson} setFindname={setFindname} />  
      <h2>Add new contact</h2>
      <AddPerson newName={newName} newNumber={newNumber} persons={persons} setPersons={setPersons} 
      setNewName={setNewName} setNewNumber={setNewNumber} handleNewNumber={handleNewNumber} handleNewPerson={handleNewPerson}
      findName={findName} message={setMessage} errorMessage={setErrorMessage} />
      <h2>Contacts</h2>
      <Persons persons={searchByName} setPersons={setPersons} deleteButton={deleteButton} /> 
    </div>
  )
}

export default App
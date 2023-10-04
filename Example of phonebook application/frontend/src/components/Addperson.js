import phoneBook from "../services/phonebook"

const AddPerson = ({newName, newNumber, persons, setPersons,setNewName,setNewNumber,
  handleNewNumber, handleNewPerson, message, errorMessage}) => {
  
  const addPerson = (event) =>{
      event.preventDefault()
      const personObject ={
        name: newName,
        number: newNumber
      }
  
      const checkName = obj => obj.name === personObject.name
      
      if (persons.some(checkName) === false) {
          phoneBook
            .create(personObject)
            .then(response => {
              setPersons(persons.concat(response.data))
              message(`Added ${personObject.name}`)
              setTimeout(() => {
              message(null)
            }, 5000)
            })
            .catch(error => {
              console.log(error.response.data)
              errorMessage(`${error.response.data.error}`)
              setTimeout(() =>{
              errorMessage(null)
            }, 5000)
            })
            
      } else {
        const updateConfirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        
        if(updateConfirm === true){
          const person = persons.find(p => p.name === personObject.name)
          phoneBook
          .update(person.id, personObject)
          .then(response => {
                console.log('updated', response.data)
                phoneBook
                .getAll()
                .then(response => {
                  setPersons(response.data)})
                  message(`${newName} updated to ${newNumber}`)
                  setTimeout(() => {
                  message(null)
                  }, 5000)
          
          })
          .catch(error => {
            console.log(error)
            errorMessage(`Information of ${newName} has already removed from the server`)
            setTimeout(() =>{
              errorMessage(null)
            }, 5000)
          })  
        }
      }
      setNewName('')
      setNewNumber('')
    }
        
    return(
    <div className="addperson">
      <form onSubmit={addPerson}>
              <div> name: <input 
                    value={newName}
                    onChange={handleNewPerson}
                    />&nbsp;
                    number: <input
                    value={newNumber}
                    onChange={handleNewNumber}      
                />
              </div>
              <button type="submit">add</button>      
          </form>
        
    </div>
    )
  }
  export default AddPerson
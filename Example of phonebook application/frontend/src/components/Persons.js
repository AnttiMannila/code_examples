const Persons =  ({persons, deleteButton}) =>{

  const Person = ({person}) => {
    return(
      <li className="person">
        {person.name} {person.number}&nbsp;
        <button onClick={ () => deleteButton(person)}>delete</button>
      </li>
    )
  }
  
  const Contacts = ({persons}) => {
    return( 
      persons.map(person =>
        <Person key={person.id} person={person}/>)
      )
    }
    
  return(
      <Contacts persons={persons}/>
    )
  }

export default Persons
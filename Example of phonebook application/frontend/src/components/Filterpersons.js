const FilterPersons = ({setFindname, findName, handleFindPerson}) =>{
    const findPerson = (event) =>{
      event.preventDefault()
      setFindname(findName) 
  }
  return(
    <form onSubmit={findPerson}>
      filter shown with:<input 
      value={findName} 
      onChange={handleFindPerson}  
  />
  </form>
  )}

  export default FilterPersons
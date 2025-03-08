import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import { getBooks } from "../services/crud";
import { BookList } from "../components/BookList";

export const UserHistory = () => {
  const [ books, setBooks ] = useState([])

  useEffect(() => {
    getBooks()
    .then(data => {
      console.log(data)
      setBooks(data)})
    .catch(err => console.error(err))
  }, [])

  return (
    <>
      <header className='btn-back'>
        <NavLink to={`/`} >
          Events list
        </NavLink>
      </header>
      <BookList events={books}/>
    </>
  )
}
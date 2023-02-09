import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './routes/HomePage'
import NewNote from './routes/NewNote'
import EditNotePage from './routes/EditNotePage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/newNote" element={<NewNote />}></Route>
        <Route path='/edit/:id' element={<EditNotePage />}></Route>

        <Route path="*" element={<h1> not found</h1>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)

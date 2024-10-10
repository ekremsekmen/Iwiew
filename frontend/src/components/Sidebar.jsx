import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <>
    <div>Sidebar</div>
    <Link to="/admin">Manage Questions</Link><br/>
    <Link to="/interview">Interview</Link>
    </>
  )
}

export default Sidebar
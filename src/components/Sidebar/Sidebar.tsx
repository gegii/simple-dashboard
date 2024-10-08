import React from 'react'
import './Sidebar.css'

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <div className="menu-block">Expand Card and Click Delete</div>
      <button className="logout-button">Log out</button>
    </div>
  )
}

export default Sidebar

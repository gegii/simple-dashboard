import React from 'react'
import Header from './components/Header/Header.tsx'
import Sidebar from './components/Sidebar/Sidebar.tsx'
import CardList from './components/CardList/CardList.tsx'
import Footer from './components/Footer/Footer.tsx'
import './App.css'

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-layout">
        <Header />
        <div className="content">
          <CardList />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default App

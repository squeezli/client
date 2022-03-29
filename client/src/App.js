import React from "react"
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './router'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'
import { Navbar } from './components/navbar/Navbar'
import { NavbarNoAuth } from './components/navbar/NavbarNoAuth'
import { Loader } from "./components/loader/Loader"

function App() {
  const { token, login, logout, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return (
      <Loader />
    )
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <Navbar />}
        {!isAuthenticated && <NavbarNoAuth />}
        <div className='container'>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App

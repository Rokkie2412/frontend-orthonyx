import React, { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { UserContext } from './context'
import { Footer, TopBarNavigation, Toaster } from './shared'
import { Dashboard, LabData, LandingPage, ProtectedRoute, SignIn, SignUp, NotFound, ListPatients } from './pages'
import type { UserProfile } from './shared/types'

const _renderProtectedRoutesDashboard = (): React.ReactElement => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}

const _renderProtectedRoutesLabData = (): React.ReactElement => {
  return (
    <ProtectedRoute>
      <LabData />
    </ProtectedRoute>
  )
}

const _renderProtectedRoutesListPatients = (): React.ReactElement => {
  return (
    <ProtectedRoute>
      <ListPatients />
    </ProtectedRoute>
  )
}

const App = (): React.ReactElement => {
  const [user, setUser] = useState<UserProfile | undefined>(undefined)
  const [patiendId, setPatiendId] = useState<string>('')
  const location = useLocation()
  const validRoutesTopBar = [
    /^\/list-patients\/[^/]/,
    /^\/dashboard\/[^/]+\/[^/]+$/,
    /^\/lab-data\/[^/]+\/[^/]+$/,
    /^\/profile\/[^/]+\/[^/]+$/
  ];


  const shouldHideTopBar = !validRoutesTopBar.some(route => route.test(location.pathname))

  return (
    <UserContext.Provider value={{ user, setUser, patiendId, setPatiendId }}>
      {!shouldHideTopBar && <TopBarNavigation />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/list-patients/:userid' element={_renderProtectedRoutesListPatients()} />
        <Route path={`/dashboard/:userid/:patientid`} element={_renderProtectedRoutesDashboard()} />
        <Route path={`/lab-data/:userid/:patientid`} element={_renderProtectedRoutesLabData()} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      {!shouldHideTopBar && <Footer />}
      <Toaster />
    </UserContext.Provider>
  )
}

export default App

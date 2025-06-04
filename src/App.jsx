import { useState } from 'react'
import './App.css'
import SummaryWidget from './components/SummaryWidget'
import InvoicesWidget from './components/InvoicesWidget'

function App() {

  return (
    <>
      <h2>Financial Dashboard</h2>
      <SummaryWidget />
      <InvoicesWidget />
    </>
  )
}

export default App

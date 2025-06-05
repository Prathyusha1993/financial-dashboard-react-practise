import { useState } from 'react'
import './App.css'
import SummaryWidget from './components/SummaryWidget'
import InvoicesWidget from './components/InvoicesWidget'
import { mockInvoices, transactions } from './data/mockData'

function App() {
  const [invoices, setInvoices] = useState(mockInvoices);

  return (
    <>
      <h2>Financial Dashboard</h2>
      <SummaryWidget invoices={invoices} transactions={transactions} />
      <InvoicesWidget invoices={invoices} setInvoices={setInvoices} transactions={transactions} />
    </>
  )
}

export default App

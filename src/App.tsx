import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'



import TransactionCard from './components/transactionCard'
import { Transaction } from './types'
import Visualisation from './components/visulalisation'
import TransactionTable from './components/table'
import Layout from './layout'

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>()
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>()
  const [isFetchingMails, setIsFetchingMails] = useState<boolean>(false)
  const [isFetchingTransactions, setIsFetchingTransactions] = useState<boolean>()

  // Hook for getting transactions
  useEffect(() => {
    getTransactions()
    // handleRefresh();
  }, [])



  const getTransactions = () => {
    setIsFetchingTransactions(true)
    axios.get('http://127.0.0.1:8000/transactions/getMails/').then(res => {
      setTransactions(res.data)
      setFilteredTransactions(res.data)
      setIsFetchingTransactions(false)
    })
  }

  const handleRefresh = () => {
    setIsFetchingMails(true)
    axios.get('http://127.0.0.1:8000/transactions/fetchMails/').then(res => {
      if (res) {
        getTransactions()
        setIsFetchingMails(false)
      }
    })
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout transactions={transactions} filteredTransactions={filteredTransactions} setFilteredTransactions={setFilteredTransactions} isFetchingMails={isFetchingMails} handleRefresh={handleRefresh}/>
      ),
      children: [
        {
          path: '/',
          element: (
            <TransactionCard
              transactions={filteredTransactions?.slice(0, 6)}
              setTransactions={setTransactions}
              isFetchingTransactions={isFetchingTransactions}
            />
          ),
        },
        {
          path: '/allTransactions',
          element: (
            <TransactionTable transactions={filteredTransactions} setTransactions={setTransactions} />
          ),
        },
        {
          path: '/summary',
          element: <Visualisation filteredTransactions={filteredTransactions} />,
        },
      ]
    },
  ])
  return (
    <>
          <RouterProvider router={router} />
      
    </>
  )
}
export default App

import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateTransactions } from './redux/transaction/transactionSlice'
import TransactionCard from './components/transactionCard'
import Visualisation from './pages/summary'
import TransactionTable from './pages/allTransactions'
import Layout from './layout'
import { RootState } from './redux/store'

function App() {
  const [isFetchingMails, setIsFetchingMails] = useState<boolean>(false)
  const [isFetchingTransactions, setIsFetchingTransactions] = useState<boolean>()
  const { month, year } = useSelector((state: RootState) => state.transactions.filter)
  const dispatch = useDispatch()

  // Hook for getting transactions
  useEffect(() => {
    getTransactions()
    // handleRefresh();
  }, [month, year])

  const getTransactions = () => {
    setIsFetchingTransactions(true)
    axios.get('http://127.0.0.1:8000/transactions/getMails/', {params: {
      month: month,
      year: year
    }}).then(res => {
      dispatch(updateTransactions(res.data))
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
      element: <Layout isFetchingMails={isFetchingMails} handleRefresh={handleRefresh} />,
      children: [
        {
          path: '/',
          element: <TransactionCard isFetchingTransactions={isFetchingTransactions} />,
        },
        {
          path: '/allTransactions',
          element: <TransactionTable />,
        },
        {
          path: '/summary',
          element: <Visualisation />,
        },
      ],
    },
  ])
  return (
      <RouterProvider router={router} />
  )
}
export default App

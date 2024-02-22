import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'
import { Box, IconButton, Paper } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'

import TransactionFilter from './components/transactionFilter'
import { Transaction } from './types'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

interface LayoutProps {
  isFetchingMails?: boolean
  handleRefresh: any
}

function Layout({
  isFetchingMails,
  handleRefresh,
}: LayoutProps) {
  const [totalAmount, setTotalAmount] = useState<number>()
  const filteredTransactions = useSelector((state: RootState) => state.transactions.filteredTransactions)
  // Hook for calculating total monthly amount
  useEffect(() => {
    let sum: number | undefined = filteredTransactions?.reduce(
      (agg: number, transaction: Transaction) => {
        return agg + transaction.amount
      },
      0,
    )
    setTotalAmount(sum)
  }, [filteredTransactions])

  return (
    <>
      <Navbar />
      <Paper
        elevation={0}
        sx={{
          m: 2,
          p: 2,
          borderRight: '1px solid',
          borderLeft: '1px solid',
          borderBottom: '2px solid',
          borderColor: 'secondary.main',
        }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            Total Spent: ₹ {totalAmount?.toLocaleString('en-IN')}
            <IconButton onClick={handleRefresh} className={isFetchingMails ? 'refreshIcon' : ''}>
              <RefreshIcon fontSize='small' />
            </IconButton>
          </Box>
          <TransactionFilter
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            maxHeight: 110,
            position: 'relative',
            top: 30,
          }}>
          <Outlet />
        </Box>
      </Paper>
    </>
  )
}

export default Layout

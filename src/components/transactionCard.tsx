import axios from 'axios'
import { Transaction } from '../types'
import { Avatar, Box, Card, Divider, Skeleton, Typography } from '@mui/material'
import { categories } from '../constants/menuItems'
import { SelectChangeEvent } from '@mui/material/Select'
import SetCategory from './setCategory'

interface TransactionCardProps {
  transactions?: Transaction[]
  setTransactions?: any
  isFetchingTransactions?: boolean
}

function TransactionCard({
  transactions,
  setTransactions,
  isFetchingTransactions,
}: TransactionCardProps) {
  const handleCategoryChange = (event: SelectChangeEvent, transaction_id: number) => {
    console.log(event.target.value, transaction_id)
    axios
      .get('http://localhost:8000/transactions/updateCategory', {
        params: {
          category: event.target.value,
          transaction_id: transaction_id,
        },
      })
      .then(res => {
        console.log(res)
      })
    const updatedTransaction: any = transactions?.map(transaction => {
      if (transaction.transaction_id === transaction_id) {
        return { ...transaction, category: event.target.value }
      }
      return transaction
    })
    setTransactions(updatedTransaction)
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <Typography variant='overline'>Recent Transactions</Typography>
      {transactions &&
        transactions.map(transaction => (
          <>
            {isFetchingTransactions ? (
              <LoadingSkeleton />
            ) : (
              <Card key={transaction.id} sx={{ width: 190, m: 1 }}>
                <Box sx={{ display: 'flex', m: 1 }}>
                  <Box sx={{ mr: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: categories[transaction.category]?.category_color,
                      }}>
                      {categories[transaction.category]?.category_avatar}
                    </Avatar>
                  </Box>
                  <Box>
                    <Typography variant='subtitle1' sx={{ height: 20 }}>
                      ₹ {transaction.amount.toLocaleString('en-IN')}
                    </Typography>
                    <SetCategory
                      transaction={transaction}
                      handleCategoryChange={handleCategoryChange}
                    />
                  </Box>
                </Box>
                <Divider />
                <Box sx={{ height: 30, p: 1 }}>
                  <Typography sx={{ fontSize: '0.7rem' }}>
                    Sent to: {transaction.details}
                  </Typography>
                </Box>
                <Divider />
                <Typography sx={{ fontSize: '0.75rem', m: 1, textAlign: 'center' }}>
                  {transaction.date}
                </Typography>
              </Card>
            )}
          </>
        ))}
    </Box>
  )
}

function LoadingSkeleton() {
  return (
    <Box sx={{ m: 1 }}>
      <Skeleton variant='circular' color='red' width={40} height={40} sx={{ mb: 1 }} />
      <Skeleton variant='rectangular' width={210} height={90} />
    </Box>
  )
}
export default TransactionCard

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Transaction } from '../types'
import { categories } from '../constants/menuItems'
import { useState } from 'react'

interface TransactionCardProps {
  transactions?: Transaction[]
  setTransactions?: any
}
function TransactionTable({ transactions, setTransactions }: TransactionCardProps) {
  const [visibleRows, setVisibleRows] = useState<number>(10)
  return (
    <>
      {transactions && (
        <TableContainer component={Paper} sx={{ width: '80%', height: '70vh' }}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow sx={{ position: 'sticky', backgroundColor: "secondary.main" }}>
                <TableCell>Receipient</TableCell>
                <TableCell align='right'>Amount</TableCell>
                <TableCell align='right'>Category&nbsp;</TableCell>
                <TableCell align='right'>Date&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.slice(0, visibleRows).map(transaction => (
                <TableRow
                  key={transaction.transaction_id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{
                        bgcolor: categories[transaction.category]?.category_color,
                        mr: 2,
                        width: 35,
                        height: 35,
                      }}>
                      {categories[transaction.category].category_avatar}
                    </Avatar>
                    {transaction.details}
                  </TableCell>
                  <TableCell align='right'>₹ {transaction.amount.toLocaleString('en-IN')}</TableCell>
                  <TableCell align='right'>{categories[transaction.category].category_label}</TableCell>
                  <TableCell align='right'>{transaction.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {visibleRows < transactions?.length && (
            <Button onClick={() => setVisibleRows(prev => prev + 10)} sx={{ mx: 'auto', display: 'block'}}>Show More..</Button>
          )}
        </TableContainer>
      )}
    </>
  )
}

export default TransactionTable

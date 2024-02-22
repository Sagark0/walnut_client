import { createSlice } from '@reduxjs/toolkit'
import { Transaction } from '../../types'

interface TransactionsState {
  transactions: Transaction[]
  filteredTransactions: Transaction[]
}

const initialState: TransactionsState = {
  transactions: [],
  filteredTransactions: [],
}
export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    updateTransactions: (state, action) => {
      state.transactions = action.payload
      state.filteredTransactions = action.payload
    },
    setFilteredTransactions: (state, action) => {
      state.filteredTransactions = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateTransactions, setFilteredTransactions } = transactionSlice.actions

export default transactionSlice.reducer

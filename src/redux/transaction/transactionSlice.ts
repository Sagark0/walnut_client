import { createSlice } from '@reduxjs/toolkit'
import { Transaction } from '../../types'

interface TransactionsState {
  transactions: Transaction[]
  filteredTransactions: Transaction[]
  filter: {
    month: string,
    year: string,
  }
}

const initialState: TransactionsState = {
  transactions: [],
  filteredTransactions: [],
  filter: {
    month: '2',
    year: '2024',
  }
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
    updateMonth: (state, action) => {
      state.filter.month = action.payload
    },
    updateYear: (state, action) => {
      state.filter.year = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateTransactions, setFilteredTransactions, updateMonth, updateYear } = transactionSlice.actions

export default transactionSlice.reducer

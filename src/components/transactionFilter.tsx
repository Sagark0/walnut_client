import { useEffect, useState } from 'react'
import ListItemText from '@mui/material/ListItemText'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { Transaction } from '../types'
import { categories } from '../constants/menuItems'
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
}

interface TransactionCardProps {
  transactions?: Transaction[]
  setFilteredTransactions?: any
}

function TransactionFilter({ transactions, setFilteredTransactions }: TransactionCardProps) {
  const [transactionCategory, setTransactionCategory] = useState<string[]>(
    Object.values(categories).map(c => c.category_id),
  )

  useEffect(() => {
    const filtered = transactions?.filter(transaction =>
      transactionCategory.includes(transaction.category),
    )
    setFilteredTransactions(filtered)
  }, [transactions, transactionCategory])

  const handleChange = (event: SelectChangeEvent<typeof transactionCategory>) => {
    const {
      target: { value },
    } = event
    setTransactionCategory(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  return (
    <>
      <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel id='demo-multiple-chip-label'>Categories</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={transactionCategory}
          onChange={handleChange}
          input={<OutlinedInput label='Category' />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}>
          {Object.values(categories).map(category => (
            <MenuItem key={category.category_id} value={category.category_id}>
              <Checkbox checked={transactionCategory.indexOf(category.category_id) > -1} />
              <ListItemText primary={category.category_label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default TransactionFilter

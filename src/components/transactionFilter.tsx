import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setFilteredTransactions, updateMonth, updateYear } from '../redux/transaction/transactionSlice'
import ListItemText from '@mui/material/ListItemText'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import { categories, months, years } from '../constants/menuItems'
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

function TransactionFilter() {
  const dispatch = useDispatch()
  const { transactions, filter } = useSelector((state: RootState) => state.transactions)
  const { month, year } = filter
  const [transactionCategory, setTransactionCategory] = useState<string[]>(
    Object.values(categories).map(c => c.category_id),
  )
  useEffect(() => {
    const filtered = transactions?.filter(transaction =>
      transactionCategory.includes(transaction.category),
    )
    console.log('t', transactionCategory)
    console.log('f', filtered)
    dispatch(setFilteredTransactions(filtered))
  }, [transactionCategory])

  const handleMonthChange = (event: SelectChangeEvent) => {
    dispatch(updateMonth(event.target.value))
  }
  const handleYearChange = (event: SelectChangeEvent) => {
    dispatch(updateYear(event.target.value))
  }
  const handleCategoryChange = (event: SelectChangeEvent<typeof transactionCategory>) => {
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
        {/* Month Filter */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='demo-multiple-chip-label'>Month</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={month}
          label='Month'
          onChange={handleMonthChange}>
          {months.map((month, index) => (
            <MenuItem value={index + 1} key={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

        {/* Year Filter */}
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id='demo-multiple-chip-label'>Year</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={year}
          label='Year'
          onChange={handleYearChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200, // Adjust the max height as needed
              },
            },
          }}>
          {years.map((year) => (
            <MenuItem value={year} key={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
        {/* Category Filter */}
      <FormControl sx={{ m: 1, width: 500 }}>
        <InputLabel id='demo-multiple-chip-label'>Categories</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={transactionCategory}
          onChange={handleCategoryChange}
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

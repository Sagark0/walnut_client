import { Chart } from 'react-google-charts'
import { Transaction } from '../types'
import { Paper } from '@mui/material'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'

export const options = {
  title: 'Categories wise Monthly Distribution',
  is3D: true,
}

function Visualisation() {
  const filteredTransactions = useSelector((state: RootState) => state.transactions.filteredTransactions)
  console.log('filtereddata', filteredTransactions)
  const dataMap = new Map()
  filteredTransactions?.forEach((transaction: Transaction) => {
    const { category, amount } = transaction
    if (dataMap.has(category)) {
      dataMap.set(category, dataMap.get(category) + amount)
    } else {
      dataMap.set(category, amount)
    }
  })
  const data = [['Category', 'Amount']]
  dataMap.forEach((amount, category) => {
    data.push([category, amount])
  })
  return (
    <Paper sx={{ width: '80%', height: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
      <Chart chartType='PieChart' data={data} options={options} width={'100%'} height={'350px'} />
    </Paper>
  )
}

export default Visualisation

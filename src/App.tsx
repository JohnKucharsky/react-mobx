import { Box } from '@mui/material'
import Counter from '@/features/Counter/Counter.tsx'
import { counterStore } from '@/features/Counter/store.ts'
import Quotes from '@/features/Quotes/Quotes.tsx'
import { quotesStore } from '@/features/Quotes/store.ts'
import { selectionStore } from '@/features/Table/store.ts'
import TableComponent from '@/features/Table/Table.tsx'
import { myTimer } from '@/features/Timer/store.ts'
import TimerComponent from '@/features/Timer/Timer.tsx'

export default function App() {
  return (
    <Box>
      <TimerComponent timer={myTimer} />
      <Counter counter={counterStore} />
      <Quotes quotes={quotesStore} />
      <TableComponent selectionStore={selectionStore} />
    </Box>
  )
}

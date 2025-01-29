import { Box } from '@mui/material'
import Counter from '@/features/Counter/Counter.tsx'
import { counterStore } from '@/features/Counter/store.ts'
import Quotes from '@/features/Quotes/Quotes.tsx'
import { quotesStore } from '@/features/Quotes/store.ts'
import { myTimer } from '@/features/Timer/store.ts'
import TimerComponent from '@/features/Timer/Timer.tsx'

export default function App() {
  return (
    <Box>
      <TimerComponent timer={myTimer} />
      <Counter counter={counterStore} />
      <Quotes quotes={quotesStore} />
    </Box>
  )
}

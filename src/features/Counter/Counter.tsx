import { useState } from 'react'
import { Box, Button, OutlinedInput, Stack, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { CounterStore } from '@/features/Counter/store.ts'

const Counter = observer(({ counter }: { counter: CounterStore }) => {
  const [incrementAmount, setIncrementAmount] = useState('2')

  const incrementValue = Number(incrementAmount) || 0

  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center" my={2}>
        <Button
          size={'small'}
          variant={'outlined'}
          onClick={() => counter.decrement()}
        >
          -
        </Button>
        <Typography variant={'h6'}>{counter.value}</Typography>
        <Button
          size={'small'}
          variant={'outlined'}
          onClick={() => counter.increment()}
        >
          +
        </Button>
      </Stack>

      <Stack alignItems={'flex-start'} gap={1}>
        <OutlinedInput
          size={'small'}
          value={incrementAmount}
          type="number"
          onChange={(e) => {
            setIncrementAmount(e.target.value)
          }}
        />
        <Button
          size={'small'}
          variant={'outlined'}
          onClick={() => counter.incrementByAmount(incrementValue)}
        >
          Add Amount
        </Button>
        <Button
          size={'small'}
          variant={'outlined'}
          disabled={counter.status !== 'idle'}
          onClick={() => counter.incrementAsync(incrementValue)}
        >
          Add Async
        </Button>
        <Button
          size={'small'}
          variant={'outlined'}
          onClick={() => {
            counter.incrementIfOdd(incrementValue)
          }}
        >
          Add If Odd
        </Button>
      </Stack>
    </Box>
  )
})

export default Counter

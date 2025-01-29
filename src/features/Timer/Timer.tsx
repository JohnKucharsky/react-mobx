import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { Timer } from '@/features/Timer/store.ts'

const TimerComponent = observer(({ timer }: { timer: Timer }) => {
  useEffect(() => {
    const handle = setInterval(() => {
      timer.increaseTimer()
    }, 1000)
    return () => {
      clearInterval(handle)
    }
  }, [timer])

  return (
    <Typography variant={'h6'}>
      Seconds passed: {timer.secondsPassed}
    </Typography>
  )
})
export default TimerComponent

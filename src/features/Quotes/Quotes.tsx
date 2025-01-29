import { useEffect } from 'react'
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { QuotesStore } from '@/features/Quotes/store.ts'

const options = [5, 10, 20, 30]

const Quotes = observer(({ quotes }: { quotes: QuotesStore }) => {
  useEffect(() => {
    quotes.fetchQuotes().catch(console.error) // Fetch quotes with the current limit
  }, [quotes])

  const handleLimitChange = (event: SelectChangeEvent<number>) => {
    const newLimit = Number(event.target.value)

    if (!isNaN(newLimit)) {
      quotes.setLimit(newLimit) // Update the limit in the store
      quotes.fetchQuotes(newLimit).catch(console.error) // Fetch quotes with the new limit
    }
  }

  if (quotes.hasError) {
    return <Typography variant={'h3'}>There was an error!!!</Typography>
  }

  if (quotes.isLoading) {
    return <Typography variant={'h3'}>Loading...</Typography>
  }

  return (
    <Box>
      <Typography variant={'h5'}>
        Select the Quantity of Quotes to Fetch:
      </Typography>
      <Select value={quotes.limit} onChange={handleLimitChange}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {quotes.quotes.map(({ author, quote, id }) => (
        <Typography
          variant={'h6'}
          key={id}
          component={'blockquote'}
          sx={{
            fontStyle: 'italic',
            mb: 2,
          }}
        >
          &ldquo;{quote}&rdquo;
          <Typography variant="subtitle2" component="footer" align="right">
            <cite>{author}</cite>
          </Typography>
        </Typography>
      ))}
    </Box>
  )
})

export default Quotes

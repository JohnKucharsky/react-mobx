import axios from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

interface Quote {
  id: number
  quote: string
  author: string
}

interface QuotesApiResponse {
  quotes: Quote[]
  total: number
  skip: number
  limit: number
}

export class QuotesStore {
  quotes: Quote[] = []
  limit: number = 10
  status: 'idle' | 'loading' | 'error' = 'idle'

  constructor() {
    makeAutoObservable(this)
  }

  async fetchQuotes(limit: number = 10) {
    this.status = 'loading'

    try {
      const response = await axios.get<QuotesApiResponse>(
        `https://dummyjson.com/quotes`,
        { params: { limit } },
      )

      runInAction(() => {
        this.quotes = response.data.quotes
        this.status = 'idle'
      })
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          console.error('Failed to fetch quotes', error.message)
        }
        this.status = 'error'
      })
    }
  }

  setLimit(newLimit: number) {
    this.limit = newLimit
  }

  get isLoading() {
    return this.status === 'loading'
  }

  get hasError() {
    return this.status === 'error'
  }
}

export const quotesStore = new QuotesStore()

import { makeAutoObservable, runInAction } from 'mobx'

const fetchCount = (amount = 1) => {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500),
  )
}

export class CounterStore {
  value: number = 0
  status: 'idle' | 'loading' | 'failed' = 'idle'

  constructor() {
    makeAutoObservable(this)
  }

  increment() {
    this.value += 1
  }

  decrement() {
    this.value -= 1
  }

  incrementByAmount(amount: number) {
    this.value += amount
  }

  async incrementAsync(amount: number) {
    this.status = 'loading'
    try {
      const response = await fetchCount(amount)
      runInAction(() => {
        this.value += response.data
        this.status = 'idle'
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.status = 'failed'
      })
    }
  }

  incrementIfOdd(amount: number) {
    if (this.value % 2 !== 0) {
      this.incrementByAmount(amount)
    }
  }
}

export const counterStore = new CounterStore()

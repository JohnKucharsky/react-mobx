import { makeAutoObservable } from 'mobx'

export class Timer {
  secondsPassed = 0

  constructor() {
    makeAutoObservable(this)
  }

  increaseTimer() {
    this.secondsPassed += 1
  }
}

export const myTimer = new Timer()

import { makeAutoObservable } from 'mobx'
import { generateRandomData, RowType } from '@/features/Table/service.ts'

export class SelectionStore {
  data: RowType[] = generateRandomData(10)
  selected: number[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setSelected(checked: boolean) {
    this.selected = checked ? this.data.map((row) => row.id) : []
  }

  handleSelect(id: number) {
    if (this.selected.includes(id)) {
      const itemId = this.selected.indexOf(id)
      this.selected.splice(itemId, 1)
    } else {
      this.selected.push(id)
    }
  }

  isSelected(id: number) {
    return this.selected.includes(id)
  }

  get indeterminate() {
    return this.selected.length > 0 && this.selected.length < this.data.length
  }

  get checked() {
    return this.data.length > 0 && this.selected.length === this.data.length
  }
}

export const selectionStore = new SelectionStore()

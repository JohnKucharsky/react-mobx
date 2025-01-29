export type RowType = {
  id: number
  name: string
  age: number
  city: string
}

export const generateRandomData = (count: number): RowType[] => {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve']
  const cities = ['New York', 'London', 'Paris', 'Berlin', 'Tokyo']

  return Array.from({ length: count }, (_, id) => ({
    id,
    name: names[Math.floor(Math.random() * names.length)],
    age: Math.floor(Math.random() * 50) + 20,
    city: cities[Math.floor(Math.random() * cities.length)],
  }))
}

import { nanoid } from 'nanoid'

export default function MockData() {
  const numCustomers = 100
  const numTransactions = 1000
  const minPrice = 1
  const maxPrice = 500
  const today = new Date()
  const customers = []
  const data = []

  function getRandomDate() {
    const threeMonthsAgo = new Date()
    threeMonthsAgo.setMonth(today.getMonth() - 3)
    const randomTimestamp = Math.random() * (today.getTime() - threeMonthsAgo.getTime()) + threeMonthsAgo.getTime()
    return new Date(randomTimestamp)
  }

  function createCustomers() {
    for(let i = 0; i < numCustomers; i += 1) {
      customers.push(nanoid())
    }
  }

  function createData() {
    let customer
    for(let i = 0; i < numTransactions; i += 1) {
      customer = Math.floor(Math.random() * customers.length)
      data.push({
        customerId: customers[customer],
        price: Math.floor(Math.random() * maxPrice) + minPrice,
        date: getRandomDate()
      })
    }
  }

  function init() {
    createCustomers()
    createData()
  }
  
  init()
  return data
}

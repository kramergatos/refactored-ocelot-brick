import { nanoid } from 'nanoid'

export default function Api() {
  const numCustomers = 100
  const numTransactions = 1000
  const today = new Date()
  const thisMonth = today.getMonth()
  const customers = []
  const data = []
  let results = {}

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
        price: Math.floor(Math.random() * 500) + 1,
        date: getRandomDate()
      })
    }
  }

  function calcRewardPoints(price) {
    let points = 0
    if(price >= 50) {
      if(price <= 100) {
        points += (price - 50)
      }else {
        points += (((price - 100) * 2) + 50)
      }
    }
    //console.log(`api.calcRewardPoints @price=${price} @points=${points}`)
    return points
  }

  function updateCustomerPoints(customer, month, points) {
    if(month === thisMonth) {
      customer.month3 += points
    }else if(month === (thisMonth - 1)) {
      customer.month2 += points
    }else {
      customer.month1 += points
    }
    customer.total += points
    //console.log(`api.updateCustomerPoints @month=${month} @thisMonth=${thisMonth} @points=${points} @customer=${JSON.stringify(customer)}`)
    return customer
  }

  function processRecords() {
    let id
    let points = 0
    let month
    for(let index = 0; index < data.length; index += 1) {
      id = data[index].customerId
      points = 0
      points = calcRewardPoints(data[index].price)
      month = data[index].date.getMonth()
      if(results[id] === undefined) {
        results[id] = {
          customerId: id,
          month1: 0,
          month2: 0,
          month3: 0,
          total: 0
        }
      }
      results[id] = updateCustomerPoints(results[id], month, points)
    }
  }
  
  function init() {
    createCustomers()
    createData()
    processRecords()
  }
  
  init()
  return results
}

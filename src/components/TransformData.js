export default function TransformData(data) {
  const today = new Date()
  const thisMonth = today.getMonth()
  let results = {}

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
    processRecords()
  }
  
  init()
  return results
}

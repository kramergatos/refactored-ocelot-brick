import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import Api from './Api'
import Transaction from './Transaction'
import '../App.css'

function Transactions() {
  const [isLoading, setLoading] = useState(true)
  const [results, setResults] = useState()
  const fetchData = async () => {
    setTimeout(() => {
      const data = Api()
      if(data) {
        setResults(data)
        setLoading(false)
      }
    }, 1000) 
  }
  
  useEffect(() => {
    fetchData()
    console.log(results)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="table">
      <div className="row row_header">
        <div className="col col_id">
          Customer ID
        </div>
        <div className="col">
          Month 1 Rewards
        </div>
        <div className="col">
          Month 2 Rewards
        </div>
        <div className="col">
          Month 3 Rewards
        </div>
        <div className="col">
          Total Reward Points
        </div>
      </div>
      {Object.keys(results).map((key) => (
        <Transaction
          data={results[key]}
          key={nanoid()}
        />
      ))}
    </div>
  )
}

export default Transactions

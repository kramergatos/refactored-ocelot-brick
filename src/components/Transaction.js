import '../App.css'

function Transaction(props) {
  return (
    <div className="row">
      <div className="col col_id">
        {props.data.customerId}
      </div>
      <div className="col">
        {props.data.month1}
      </div>
      <div className="col">
        {props.data.month2}
      </div>
      <div className="col">
        {props.data.month3}
      </div>
      <div className="col">
        {props.data.total}
      </div>
    </div>
  )
}

export default Transaction

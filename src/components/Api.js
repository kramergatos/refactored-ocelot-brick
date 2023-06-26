import MockData from './MockData'
import TransformData from './TransformData'

export default function Api() {
  let data = MockData()
  let results = TransformData(data)
  return results
}

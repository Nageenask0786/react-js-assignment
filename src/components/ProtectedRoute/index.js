import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const userData = localStorage.getItem('user_details')
  if (!userData) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
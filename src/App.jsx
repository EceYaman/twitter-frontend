import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import TweetList from './components/TweetList'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4">
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <PrivateRoute exact path="/tweets" component={TweetList} />
          <Redirect exact from="/" to="/tweets" />
          <Redirect to="/" />
        </Switch>
      </main>
    </>
  )
}

export default App
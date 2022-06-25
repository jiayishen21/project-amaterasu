import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const pfp = user ? require(`../assets/pfp/${user.pfp}.png`) : null;

  const sleepGoal = user ? (user.sleepGoal ? `${user.sleepGoal} h` : "none") : null
  const calorieGoal = user ? (user.calorieGoal ? `${user.calorieGoal} cal` : "none") : null
  const waterGoal = user ? (user.waterGoal ? `${user.waterGoal} mL` : "none") : null

  return (
    <>
      <div className='page-container' style={{backgroundColor: user && user.color}}>
        <section className='profile-container'>
          <div className='profile-content'>
            <img src={pfp} className="pfp" />
            <div className='profile-component'>
              <div>Welcome back {user && user.name}</div>
              <div>Began fitness journey {user && user.day} days ago</div>
              <Link to="/edit-profile">
                <button className="btn">Edit profile</button>
              </Link>
            </div>
            <div className='profile-component'>
              <div>Sleep goal: {sleepGoal}</div>
              <div>Calorie goal: {calorieGoal}</div>
              <div>Water goal: {waterGoal}</div>
            </div>
          </div>
        </section>

        <GoalForm />

        <section className='content'>
          {goals.length > 0 ? (
            <div className='goals'>
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </div>
          ) : (
            <h3>You have not set any goals</h3>
          )}
        </section>
      </div>
    </>
  )
}

export default Dashboard

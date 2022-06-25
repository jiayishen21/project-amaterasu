import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditProfile() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user])

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
              <Link to="/">
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
      </div>
    </>
  )
}

export default EditProfile
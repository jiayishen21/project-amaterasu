import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'
import sleepImg from '../assets/sleep.png'
import foodImg from '../assets/food.png'
import waterImg from '../assets/water.png'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  const [bgColor, setBgColor] = useState();
  const [cardColor, setCardColor] = useState();
  const [pfp, setPfp] = useState();
  const [sleepGoal, setSleepGoal] = useState();
  const [calorieGoal, setCalorieGoal] = useState();
  const [waterGoal, setWaterGoal] = useState();

  const [sleep, setSleep] = useState(0);
  const [calorie, setCalorie] = useState(0);
  const [water, setWater] = useState(0);

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user || (user.message && user.stack)) {
      navigate('/login')
    }

    dispatch(getGoals())

    if(user) {
      setBgColor(user.bgColor)
      setCardColor(user.cardColor)
      setPfp(require(`../assets/pfp/${user.pfp}.png`))
      setSleepGoal(user.sleepGoal ? `${user.sleepGoal} h` : "none")
      setCalorieGoal(user.calorieGoal ? `${user.calorieGoal} cal` : "none")
      setWaterGoal(user.waterGoal ? `${user.waterGoal} mL` : "none")
    }
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className='page-container' style={{backgroundColor: bgColor}}>
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

        <section className="habit-container">
          <div className="goal-container" style={{backgroundColor: cardColor}}>
            <GoalForm />
            {goals.length > 0 ? (
              <div className='goals'>
                {goals.map((goal) => (
                  <GoalItem key={goal._id} goal={goal} />
                ))}
              </div>
            ) : (
              <h3>You have not set any goals</h3>
            )}
          </div>

          <div className='col2'>
            <div className="goal-container" style={{backgroundColor: cardColor}}>
              <img src={sleepImg} />
              <div className='bottom-buttons'>
                <button
                  className="goal-button left-button"
                  onClick={() => {
                    if(sleep !== '' && sleep > 0) {
                      let newSleep = sleep - 1
                      setSleep(newSleep)
                    }
                  }}
                >
                  -
                </button>
                <input
                  className='goal-input'
                  id='sleep'
                  name='sleep'
                  type='number'
                  value={sleep}
                  onChange={(e) => {setSleep(parseInt(e.target.value))}}
                  onFocus={() => {setSleep('')}}
                  onBlur={() => {if(sleep === '' || sleep < 0 || sleep > 24) setSleep(0)}}
                />
                <button 
                  className="goal-button right-button"
                  onClick={() => {
                    if(sleep !== '' && sleep < 24) {
                      let newSleep = sleep + 1
                      setSleep(newSleep)
                    }
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <div className="goal-container" style={{backgroundColor: cardColor}}>
              <img src={foodImg} />
              <div className='bottom-buttons'>
                <button
                  className="goal-button left-button"
                  onClick={() => {
                    if(sleep !== '' && calorie > 199) {
                      let newCalorie = calorie - 200
                      setCalorie(newCalorie)
                    }
                    else if(calorie > 0) {
                      setCalorie(0)
                    }
                  }}
                >
                  -
                </button>
                <input
                  className='goal-input'
                  id='calorie'
                  name='calorie'
                  type='number'
                  value={calorie}
                  onChange={(e) => {setCalorie(parseInt(e.target.value))}}
                  onFocus={() => {setCalorie('')}}
                  onBlur={() => {if(calorie === '' || calorie < 0) setCalorie(0)}}
                />
                <button
                  className="goal-button right-button"
                  onClick={() => {
                    let newCalorie = calorie + 200
                    setCalorie(newCalorie)
                  }}
                >
                  +
                </button>
              </div>
            </div>

          </div>

          <div className="goal-container col3" style={{backgroundColor: cardColor}}>
            <img src={waterImg}/>
            <div className='bottom-buttons'>
              <button
                className="goal-button left-button"
                onClick={() => {
                  if(sleep !== '' && water > 99) {
                    let newWater = water - 200
                    setWater(newWater)
                  }
                  else if(water > 0) {
                    setWater(0)
                  }
                }}
              >
                -
              </button>
              <input
                className='goal-input'
                id='water'
                name='water'
                type='number'
                value={water}
                onChange={(e) => {setWater(parseInt(e.target.value))}}
                onFocus={() => {setWater('')}}
                onBlur={() => {if(water === '' || water < 0) setWater(0)}}
              />
              <button
                className="goal-button right-button"
                onClick={() => {
                  let newWater = water + 200
                  setWater(newWater)
                }}
              >
                +
              </button>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}

export default Dashboard

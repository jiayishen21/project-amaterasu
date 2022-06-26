import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { update, reset } from '../features/auth/authSlice'
import left from '../assets/left.png'
import right from '../assets/right.png'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'

function EditProfile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

	const totalPfps = 6

	const [pfpNum, setPfpNum] = useState()
	const [pfp, setPfp] = useState()
	const [ogColor, setOgColor] = useState()
	const [bgColor, setBgColor] = useState()
	const [lastBgColor, setLastBgColor] = useState()
	const [cardColor, setCardColor] = useState()
	const [lastCardColor, setLastCardColor] = useState()
	const [formData, setFormData] = useState({
    name: '',
    email: '',
		password: '',
		sleepGoal: '',
		calorieGoal: '',
		waterGoal: ''
  })

	const {name, email, password, sleepGoal, calorieGoal, waterGoal} = formData

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

		if(user) {
			setOgColor(user.bgColor)
      setBgColor(user.bgColor)
			setLastBgColor(user.bgColor)
			setCardColor(user.cardColor)
			setLastBgColor(user.cardColor)
			setPfpNum(user.pfp)
			setPfp(require(`../assets/pfp/${user.pfp}.png`))
    }
  }, [user])

	useEffect(() => {
		if(pfpNum) {
			setPfp(require(`../assets/pfp/${pfpNum}.png`))
		}
	}, [pfpNum])

	useEffect(() => {
		if(bgColor && validColor(bgColor)) {
			setLastBgColor(bgColor)
		}
		if(cardColor && validColor(cardColor)) {
			setLastCardColor(cardColor)
		}
	}, [bgColor, cardColor])

	const validColor = (color) => {
		if(color[0] !== "#" || color.length > 7) {
			return false
		}
		for(let i = 1; i < color.length; i ++) {
			let c = color.charAt(i)
			if (!((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F'))) {
				return false
			}
		}
		return true
	}

	const onLeft = () => {
		if(pfpNum === 1) {
			setPfpNum(totalPfps)
		}
		else {
			let newPfpNum = pfpNum - 1
			setPfpNum(newPfpNum)
		}
	}

	const onRight = () => {
		if(pfpNum === totalPfps) {
			setPfpNum(1)
		}
		else {
			let newPfpNum = pfpNum + 1
			setPfpNum(newPfpNum)
		}
	}

	const randomPfp = () => {
		let newPfpNum = Math.floor(Math.random() * totalPfps) + 1
		setPfpNum(newPfpNum)
	}

	const randomBgColor = () => {
		let newBgColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
		setBgColor(newBgColor)
	}

	const randomCardColor = () => {
		let newCardColor = `#${Math.floor(Math.random()*16777215).toString(16)}`
		setCardColor(newCardColor)
	}

	const revertLastBgColor = () => {
		setBgColor(lastBgColor)
	}

	const revertLastCardColor = () => {
		setCardColor(lastCardColor)
	}

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
			pfp: pfpNum,
			bgColor: lastBgColor,
			cardColor: lastCardColor,
			name: name ? name : user.name,
			oldEmail: user.email,
      email: email ? email : user.email,
      password: password ? password : user.password,
			sleepGoal: sleepGoal === '' ? undefined : sleepGoal,
			calorieGoal: calorieGoal === '' ? undefined : calorieGoal,
			waterGoal: waterGoal === '' ? undefined : waterGoal,
    }

  	dispatch(update(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
			<div className='page-container' style={{backgroundColor: ogColor}}>
				<section className='number-edit'>
					<div>
						<img src={pfp} />
						<div>Profile picture</div>
						<div className='pfp-select'>
							<button className='arrow' onClick={onLeft}>
								<img src={left} />
							</button>
							<p>{pfpNum}</p>
							<button className='arrow' onClick={onRight}>
								<img src={right} />
							</button>
						</div>
						<button className='btn color-input' onClick={randomPfp}>Randomize</button>
					</div>
					<div>
						<span style={{background: lastBgColor}} />
						<div>Background</div>
						<div className='form-group'>
							<input
								type="text"
								name="bgColor"
								id="bgColor"
								className='color-input'
								value={bgColor}
								onChange={(e) => setBgColor(e.target.value)}
								onBlur={revertLastBgColor}
							/>
						</div>
						<button className='btn color-input' onClick={randomBgColor}>Randomize</button>
					</div>
					<div>
						<span style={{background: lastCardColor}} />
						<div>Card color</div>
						<div className='form-group'>
							<input
								type="text"
								name="cardColor"
								id="cardColor"
								className='color-input'
								value={cardColor}
								onChange={(e) => setCardColor(e.target.value)}
								onBlur={revertLastCardColor}
							/>
						</div>
						<button className='btn color-input' onClick={randomCardColor}>Randomize</button>
					</div>
				</section>

				<section className='user-info-container'>
					<h2>Leave user data fields empty to leave as original</h2>
					<form className='user-info-form' onSubmit={onSubmit}>
						<div className='column'>
							<div className='form-group'>
								<input
								  type='text'
                  className='form-control'
                  id='new-name'
                  name='name'
                  value={name}
									placeholder='Enter new name'
									onChange={onChange}
								/>
							</div>
							<div className='form-group'>
								<input
								  type='email'
                  className='form-control'
                  id='new-email'
                  name='email'
                  value={email}
									placeholder='Enter new email'
									onChange={onChange}
								/>
							</div>
							<div className='form-group'>
								<input
								  type='password'
                  className='form-control'
                  id='new-password'
                  name='password'
                  value={password}
									placeholder='Enter new password'
									onChange={onChange}
								/>
							</div>
						</div>

						<div className='column'>
							<div className='form-group'>
								<input
								  type='number'
                  className='form-control'
                  id='new-sleep'
                  name='sleepGoal'
                  value={sleepGoal}
									placeholder='Enter new daily sleep goal'
									onChange={onChange}
								/>
							</div>
							<div className='form-group'>
								<input
								  type='number'
                  className='form-control'
                  id='new-calorie'
                  name='calorieGoal'
                  value={calorieGoal}
									placeholder='Enter new daily calorie goal'
									onChange={onChange}
								/>
							</div>
							<div className='form-group'>
								<input
								  type='number'
                  className='form-control'
                  id='new-water'
                  name='waterGoal'
                  value={waterGoal}
									placeholder='Enter new daily water goal'
									onChange={onChange}
								/>
							</div>
						</div>

						<div className='form-group'>
							<button type='submit' className='btn btn-block'>
								Save preferences
							</button>
						</div>
						<div className='form-group'>
							<Link to="/">
								<button className='btn btn-block'>
									Discard changes
								</button>
							</Link>
						</div>
					</form>
				</section>
			</div>
    </>
  )
}

export default EditProfile
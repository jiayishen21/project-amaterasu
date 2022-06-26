import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import left from '../assets/left.png'
import right from '../assets/right.png'

function EditProfile() {
  const navigate = useNavigate()

	const totalPfps = 6

  const { user } = useSelector((state) => state.auth)

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
		setBgColor(lastCardColor)
	}

  return (
    <>
			<div className='page-container' style={{backgroundColor: ogColor}}>
				<section className='number-edit'>
					<div>
						<img src={pfp} />
						<div>Select profile picture</div>
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
						<div>Select background color</div>
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
						<div>Select card color</div>
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
			</div>
    </>
  )
}

export default EditProfile
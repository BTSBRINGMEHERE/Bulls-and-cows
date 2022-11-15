import { useState, useEffect } from "react"
import "./App.css"
import generateRandomNumber from "./random"

function App() {
	const [randomNumber, setRandomNumber] = useState(generateRandomNumber())
	const [answer, setAnswer] = useState("")
	const [logs, setLogs] = useState([])
	const [isSuccess, setIsSuccess] = useState(false)

	useEffect(() => {
		console.log(randomNumber)
	}, [randomNumber])

	const handleAnswerChanged = (event) => {
		const {
			target: { value },
		} = event
		setAnswer(value)
	}

	const handleSubmit = () => {
		const ans = answer.split("").map((item) => Number(item))

		if (ans.some((number) => isNaN(number))) {
			alert("숫자만 입력해주세요")
			return
		}

		if (ans.length != 4) {
			alert("4자리 숫자만 입력해주세요")
			return
		}

		const isDuplicate = ans.some((number) => {
			return ans.indexOf(number) !== ans.lastIndexOf(number)
		})

		if (isDuplicate) {
			alert("중복된 값이 있습니다")
			return
		}

		const { strike, ball } = randomNumber.reduce(
			(prev, cur, index) => {
				// 같은 자리에 같은 수가 존재하면 스트라이크
				if (ans[index] === cur) {
					return {
						...prev,
						strike: prev.strike + 1,
					}
				}
				// 다른 자리에 수가 존재하면 볼
				if (ans.includes(cur)) {
					return {
						...prev,
						ball: prev.ball + 1,
					}
				}

				return prev
			},
			{ strike: 0, ball: 0 }
		)

		if (strike === 4) {
			alert("ㅊㅋㅊㅋㅊㅋㅊㅋ")
			setLogs([...logs, `${answer} (축하합니다. 정답입니다!!)`])
			setIsSuccess(true)
			return
		}

		setLogs([...logs, `${answer} (strike: ${strike}, ball: ${ball})`])
	}

	const handleRetry = () => {
		setRandomNumber(generateRandomNumber())
		setAnswer("")
		setLogs([])
		setIsSuccess(false)
	}

	return (
		<div className="App">
			<h1>숫자 야구 게임</h1>
			<header className="header">
				{isSuccess ? `정답: ${answer}` : "----"}
			</header>
			<section>
				<input
					type="text"
					value={answer}
					onChange={handleAnswerChanged}
					disabled={isSuccess}
				/>
				{isSuccess ? (
					<button onClick={handleRetry}>다시하기</button>
				) : (
					<button onClick={handleSubmit}>맞춰보기</button>
				)}
			</section>
			<h2>기록</h2>
			<ol>
				{logs.map((log, index) => {
					return <li key={`${log}_${index}`}>{log}</li>
				})}
			</ol>
		</div>
	)
}

export default App

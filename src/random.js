const generateRandomNumber = () => {
	const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]

	const pickNumbers = shuffle(candidates).splice(0, 4)

	return pickNumbers
}

const shuffle = (array) => {
	return array.sort(() => {
		return Math.random() - 0.5
	})
}

export default generateRandomNumber

const input = document.getElementById("datainput")
const guess = document.getElementById("guess")

let guessnow = ""
let guesscolor = ""
const elements = JSON.parse(sessionStorage.getItem("qviz"))
function subbmit(event) {
	if (event.key == "Enter") {
		input.setAttribute("disabled", "true")
		document.body.classList.add("think")
		console.log(input.value.toLocaleLowerCase())
		if (guessnow.toLocaleLowerCase() == input.value.toLocaleLowerCase()) {
			document.getElementById("card").style.backgroundColor =
				"#" + guesscolor
			document.body.classList.add("correct")
		} else {
			document.body.classList.add("wrong")
		}
		setTimeout(() => {
			document.getElementById("card").classList.add("new")
			setTimeout(() => {
				input.value = ""
				document.getElementById("card").style.backgroundColor =
					"#171717"
				getNew()
				document.getElementById("card").classList.remove("new")
				document.body.classList.remove("wrong")
				document.body.classList.remove("correct")
			}, 1200)
		}, 1000)
	}
}

const getNew = () => {
	input.removeAttribute("disabled")
	const data = elements[Math.floor(Math.random() * elements.length)]
	guess.innerText = data.symbol
	guessnow = data.name
	guesscolor = data.color
}
getNew()
input.addEventListener("keypress", subbmit)

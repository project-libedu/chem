const input = document.getElementById("datainput")
const guess = document.getElementById("guess")

const ShowPopup = (main, text) => {
	document.getElementById("popup").classList.add("show")
	document.querySelector("#popup .main").textContent = main
	document.querySelector("#popup .info").innerHTML = text
}

let guessbefore = ""
let guessnow = ""
let guesscolor = ""
let wrong = 0
let elements = JSON.parse(sessionStorage.getItem("qviz"))
function subbmit(event) {
	if (event.key == "Enter") {
		input.setAttribute("disabled", "true")
		document.body.classList.add("think")
		console.log(input.value.toLocaleLowerCase())
		if (guessnow.toLocaleLowerCase() == input.value.toLocaleLowerCase()) {
			document.getElementById("card").style.backgroundColor =
				"#" + guesscolor
			document.body.classList.add("correct")
			elements = elements.filter(
				(s) =>
					s.name.toLocaleLowerCase() !== guessnow.toLocaleLowerCase()
			)
		} else {
			document.body.classList.add("wrong")
			ShowPopup(
				"Wrong!",
				"Correct name was: <code>" + guessnow + "</code>"
			)
			wrong = wrong + 1
		}
		setTimeout(() => {
			document.getElementById("card").classList.add("new")
			setTimeout(() => {
				input.value = ""

				getNew()
			}, 1200)
		}, 1000)
	}
}

const getNew = () => {
	if (elements.length > 0) {
		document.getElementById("card").classList.remove("new")
		document.body.classList.remove("wrong")
		document.body.classList.remove("correct")
		input.removeAttribute("disabled")
		let data = elements[Math.floor(Math.random() * elements.length)]
		if (elements.length != 1) {
			while (data.symbol == guessbefore) {
				data = elements[Math.floor(Math.random() * elements.length)]
			}
		}

		document.getElementById("popup").classList.remove("show")
		guessbefore = data.symbol
		document.getElementById("card").style.backgroundColor = "#171717"
		input.focus()
		guess.innerText = data.symbol
		guessnow = data.name
		guesscolor = data.color
	} else {
		document.getElementById("done").classList.add("show")
		document.getElementById("done-wrong").innerText = wrong
	}
}
if (sessionStorage.getItem("qviz") && sessionStorage.getItem("qviz") != "[]") {
	getNew()
} else {
	alert("No elements selected")
	window.location.href = "../"
}

input.addEventListener("keypress", subbmit)

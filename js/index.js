import { PeriGen } from "../lib/perigen/main.js"
const perigen = new PeriGen("#periodictable-select")
const GenerateTable = async () => {
	// Source: https://github.com/Bowserinator/Periodic-Table-JSON
	const dataRaw = await fetch(
		"https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json"
	)
	perigen.setDataSource(await dataRaw.json())

	perigen.generate(true)
}

// eslint-disable-next-line no-unused-vars
function getData() {
	const data = perigen.getSelected("#periodictable-select")
	let qviz = []
	data.forEach((elem) => {
		qviz.push({
			symbol: perigen.getElement(elem).symbol,
			name: perigen.getElement(elem).name,
		})
	})
	sessionStorage.setItem("qviz", "")

	sessionStorage.setItem("qviz", JSON.stringify(qviz))
}

document.getElementById("getdata").addEventListener("click", getData)

GenerateTable()

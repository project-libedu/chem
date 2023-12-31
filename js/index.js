import { PeriGen } from "../lib/perigen/main.js"
const perigen = new PeriGen("#periodictable-select")

const urlParams = new URLSearchParams(window.location.search)
const import_elements = urlParams.get("import")
const GenerateTable = async () => {
	// Source: https://github.com/Bowserinator/Periodic-Table-JSON
	const dataRaw = await fetch(
		"https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json"
	)
	perigen.setDataSource(await dataRaw.json())
	perigen.translate("cz")

	perigen.generate(true, true)
	if (import_elements) {
		console.log(import_elements)
		import_elements.split(",").forEach((el) => {
			console.log(el)
			perigen.select("#periodictable-select", el.toString())
		})
	}
}

// eslint-disable-next-line no-unused-vars
function getData() {
	const data = perigen.getSelected("#periodictable-select")
	let qviz = []
	data.forEach((elem) => {
		qviz.push({
			symbol: perigen.getElement(elem).symbol,
			name: perigen.getElement(elem).name,
			color: perigen.getElement(elem)["cpk-hex"],
		})
	})
	sessionStorage.setItem("qviz", "")

	sessionStorage.setItem("qviz", JSON.stringify(qviz))
	window.location.href = "./guess/"
}

document.getElementById("getdata").addEventListener("click", getData)

GenerateTable()

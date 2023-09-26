const filter = ["Uue"]

export class PeriGen {
	/**
	 * Periodic Table Generator.
	 * @param {string} selector - The CSS selector to select elements.
	 */
	constructor(selector) {
		this.roots = document.querySelectorAll(selector)

		console.log("PeriGen verion 0.1 - Periodic Table Generator")
	}

	setDataSource(tabledata) {
		this.tabledata = tabledata
	}

	/**
	 * Generates periodic tables
	 */
	generate(sellectible) {
		this.roots.forEach((table) => {
			table.classList.add("perigen_table")
			this.tabledata.elements.forEach((element) => {
				if (filter.indexOf(element.symbol) == -1) {
					let el = document.createElement("div")
					el.classList.add("perigen_element")
					if (sellectible) {
						el.classList.add("perigen_element-m-s")
					}
					el.addEventListener("click", () => {
						el.classList.toggle("perigen_selected")
					})
					el.id = "element-" + element.symbol.toLocaleLowerCase()
					el.style.gridColumn = element.xpos
					el.style.gridRow = element.ypos
					el.style.backgroundColor = "#" + element["cpk-hex"]
					console.log(element)
					el.innerHTML = `<h1>${element.symbol}</h1><span>${element.name}</span>`
					table.appendChild(el)
				}
			})
		})
	}
	getSelected(table) {
		const elements = document.querySelectorAll(table + " .perigen_selected")
		let out = []
		elements.forEach((element) => {
			out.push(element.id.replace("element-", ""))
		})
		return out
	}
	getElement(symbol) {
		return this.tabledata.elements.filter(
			(s) => s.symbol.toLocaleLowerCase() == symbol
		)[0]
	}
}

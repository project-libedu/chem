export class PeriGen {
	/**
	 * This is a description of the PeriGen constructor.
	 * @param {string} selector - The CSS selector to select elements.
	 */
	constructor(selector) {
		this.roots = document.querySelectorAll(selector)
		console.log("PeriGen verion 0.1 - Periodic Table Generator")
	}
	generate() {}
}

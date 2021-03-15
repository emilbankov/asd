import { createPageLayout, applyPageLayout } from '../createPageLayout.js'
import { loginView } from '../views/loginView.js'
import { deserializeFormData } from './helper.js'
import { loginRequest, logoutRequest } from './requests.js'

const mainContainer = document.getElementById(`container`)
const displayPage = applyPageLayout.bind(undefined, mainContainer)

displayPage(createPageLayout())

document.addEventListener('click', e => {
	const navBarBtns = {
		login: () => {
			displayPage(createPageLayout(loginView))
		},
		logout: async () => {
			await logoutRequest()
			sessionStorage.clear()
			displayPage(createPageLayout())
		}
	}

	try {
		navBarBtns[e.target.dataset.id]()
	} catch (e) {

	}
})

document.addEventListener('submit', e => {
	e.preventDefault()
	const data = deserializeFormData(e.target)

	const forms = {
		'loginForm': async () => {
			await loginRequest(data)
			displayPage(createPageLayout())
		}
	}
	forms[e.target.dataset.id]()
})
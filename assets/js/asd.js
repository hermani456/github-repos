const URL = 'https://api.github.com'
// const nose = `https://api.github.com/users/${user}/repos?page=${pagina}&per_page=${cantidad_repos}`

const request = async (url) => {
	const response = await fetch(url)
	const result = await response.json()
	return result
}
const getUser = async (name) => {
	const url = `${URL}/users/${name}`
	return request(url)
}
const getRepo = async (name) => {
	const url = `${URL}/users/${name}/repos`
	return request(url)
}

// funcion que limpia los datos del doom
const limpiarDom = (item) => {
	item.reset()
}

const getElementBySelector = (selector) => document.querySelector(selector)
const getValueBySelector = (selector) => getElementBySelector(selector).value

const form = getElementBySelector('form')

form.addEventListener('submit', (e) => {
	e.preventDefault()
	const user = getValueBySelector('#nombre')
	const page = getValueBySelector('#pagina')
	const repos = getValueBySelector('#repo-pagina')
	const result = getElementBySelector('#resultados')
	const result2 = getElementBySelector('#resultados2')
	const luti = `https://api.github.com/users/${user}/repos?page=${page}&per_page=${repos}`

	Promise.all([getUser(user), getRepo(user)]).then((values) => {
		const user = values[0]
		const repo = values[1]
		const { login, public_repos, location, type, avatar_url } = user
		// const userName = user.login
		// const userRepos = user.public_repos
		// const userLocation = user.location
		// const userType = user.type
		// const userAvatar = user.avatar_url
		repo.forEach((element) => {
			const repoName = element.name
			result2.innerHTML = `${repoName}`
		})
		result.innerHTML = `<h3>Datos de usuario</h3>
                           <img src="${avatar_url}">
                           <p>nombre de usuario: ${login}</p>
                           <p>nombre de login: ${login}</p>
                           <p>cantidad de repositorios: ${public_repos}</p>
                           <p>localidad: ${location}</p>
                           <p>tipo de usuario: ${type}</p>`
	})
	limpiarDom(form)
})

const URL = 'https://api.github.com'

const request = async (url) => {
	const response = await fetch(url)
	const result = await response.json()
	return result
}
const getUser = async (name) => {
	const url = `${URL}/users/${name}`
	return request(url)
}
const getRepo = async (user, page, repos) => {
	const url = `${URL}/users/${user}/repos?page=${page}&per_page=${repos}`
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
   const title = getElementBySelector('#titulo')

	Promise.all([getUser(user), getRepo(user, page, repos)]).then((values) => {
      try{
		const user = values[0]
		const repo = values[1]
		console.log(repo)
		const { login, public_repos, location, type, avatar_url } = user
      result2.innerHTML = ''
		repo.forEach((element) => {
         const { name, html_url } = element
         const a = document.createElement('p')
			title.innerHTML = 'Numero de repositorios'
         a.innerHTML = `<a href="${html_url}">${name}</a>`
         result2.appendChild(a)
		})
		result.innerHTML = `<h3>Datos de usuario</h3>
                           <img src="${avatar_url}">
                           <p>nombre de usuario: ${login}</p>
                           <p>nombre de login: ${login}</p>
                           <p>cantidad de repositorios: ${public_repos}</p>
                           <p>localidad: ${location}</p>
                           <p>tipo de usuario: ${type}</p>`
   }catch(err){
      alert('hola')
   }
	})
	limpiarDom(form)
   result.innerHTML = ''
   result2.innerHTML = ''
})

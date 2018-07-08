const templates = require(`./templates`)
const herokuHost = `https://wendy-food-blog.herokuapp.com/posts`
const localHost = `http://localhost:3000/posts`

const createButton = document.querySelector('#create-button')
const sidebar = document.querySelector('#sidebar')
const viewContent = document.querySelector('#view-content')

function renderMenu() {
  const listTabContainer = document.querySelector('#list-tab')
  axios.get(`${herokuHost}`)
    .then(result => {
      let posts = result.data.data

      const listTabMenu = posts.map(post => {
        return templates.renderMenuTemplate(post)
      }).join('')

      listTabContainer.innerHTML = listTabMenu

      const listTabs = document.querySelectorAll('a')

      listTabs.forEach(listTab => listTab.addEventListener('click', function(event) {
        event.preventDefault()
        let listTabId = listTab.getAttribute('data-id')
        renderPost(listTabId)
      }))
    })
    .catch(console.error)
}


function renderPost(id){
  axios.get(`${herokuHost}/${id}`)
    .then(result => {
      let post = result.data.data
      viewContent.innerHTML = templates.postContentTemplate(post)

      const editButton = document.querySelector('#post-edit')
      editButton.addEventListener('click', editPostButton)

      const deleteButton = document.querySelector('#post-delete')
      deleteButton.addEventListener('click', deletePostButton)
    })
    .catch(console.error)
}

function deletePostButton(){
  let deletePostId = document.querySelector('#post-id').innerHTML
  axios.delete(`${herokuHost}/${deletePostId}`)
    .then(result => {
      viewContent.innerHTML = ''
      renderMenu()
    })
    .catch(console.error)
}

function editPostButton(){
  let editPostId = document.querySelector('#post-id').innerHTML
  let editPostTitle = document.querySelector('#post-name').innerHTML
  let editPostContent = document.querySelector('#post-recipe').innerHTML

  viewContent.innerHTML = templates.updateFormTemplate()

  document.querySelector("#update-id").value = editPostId
  document.querySelector('#update-name').value = editPostTitle
  document.querySelector('#update-recipe').value = editPostContent

  let updateForm = document.querySelector('#update-form')
  updateForm.addEventListener('submit', updatePost)
}

function updatePost(event){
  event.preventDefault()
  let id = document.querySelector('#update-id').value
  let name = document.querySelector('#update-name').value
  let recipe = document.querySelector('#update-recipe').value
  axios.put(`${herokuHost}/${id}`, {name, recipe})
  .then(result => {
    renderMenu()
    renderPost(id)
  })
  .catch(console.error)
}

renderMenu()

function generateForm(){
  viewContent.innerHTML = templates.createFormTemplate()
  viewContent.addEventListener('submit', createPost)
}

function createPost(event){
  event.preventDefault()
  let name = document.querySelector('#create-name').value
  let recipe = document.querySelector('#create-recipe').value
  axios.post(`${herokuHost}`, {name, recipe})
  .then(result => {
    viewContent.innerHTML = ''
    renderMenu()
  })
  .catch(console.error)

}

createButton.addEventListener('click', generateForm)

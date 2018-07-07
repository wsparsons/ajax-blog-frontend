const templates = require(`./templates/templates`)

const createButton = document.querySelector('#create-button')
const sidebar = document.querySelector('#sidebar')
const viewContent = document.querySelector('#view-content')
const navTabContent = document.querySelector('#nav-tabContent')

function renderMenu() {
  const listTabContainer = document.querySelector('#list-tab')
  axios.get(`http://localhost:3000/posts`)
    .then(result => {
      let posts = result.data.data

      const listTabMenu = posts.map(post => {
        return `<a class="list-group-item list-group-item-action" data-id="${post.id}" data-toggle="list" href="#${post.id}" role="tab">${post.title}</a>`
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
  axios.get(`http://localhost:3000/posts/${id}`)
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
  axios.delete(`http://localhost:3000/posts/${deletePostId}`)
    .then(result => {
      viewContent.innerHTML = ''
      renderMenu()
    })
    .catch(console.error)
}

function editPostButton(){
  let editPostId = document.querySelector('#post-id').innerHTML
  let editPostTitle = document.querySelector('#post-title').innerHTML
  let editPostContent = document.querySelector('#post-content').innerHTML

  viewContent.innerHTML = templates.updateFormTemplate()

  document.querySelector("#update-id").value = editPostId
  document.querySelector('#update-title').value = editPostTitle
  document.querySelector('#update-content').value = editPostContent

  let updateForm = document.querySelector('#update-form')
  updateForm.addEventListener('submit', updatePost)
}

function updatePost(event){
  event.preventDefault()
  let id = document.querySelector('#update-id').value
  let title = document.querySelector('#update-title').value
  let content = document.querySelector('#update-content').value
  axios.put(`http://localhost:3000/posts/${id}`, {title, content})
  .then(result => {
    renderMenu()
    renderPost(id)
  })
  .catch(console.error)
}

renderMenu()

function generateForm(){
  if(!viewContent.contains())

  viewContent.innerHTML = templates.createFormTemplate()
  // viewContent.addEventListener('submit', createPost)
}

// function createPost(event){
//   event.preventDefault()
//
// }


createButton.addEventListener('click', generateForm)

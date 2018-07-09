(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const templates = require(`./templates`)
const herokuHost = `https://wendy-food-blog.herokuapp.com/posts`
const localHost = `http://localhost:3000/posts`

const createButton = document.querySelector('#create-button')
const sidebar = document.querySelector('#sidebar')
const viewContent = document.querySelector('#view-content')

//// GET ALL
function renderMenu() {
  let listTabContainer = document.querySelector('#list-tab')
  axios.get(`${herokuHost}`)
    .then(result => {
      let posts = result.data.data.reverse()

      let listTabMenu = posts.map(post => {
        return templates.renderMenuTemplate(post)
      }).join('')

      listTabContainer.innerHTML = listTabMenu

      let listTabs = document.querySelectorAll('a')

      listTabs.forEach(listTab => listTab.addEventListener('click', function(event){
        event.preventDefault()
        let listTabId = listTab.getAttribute('data-id')
        renderPost(listTabId)
      }))
    })
    .catch(console.error)
}

//// GET ONE
function renderPost(id){
  axios.get(`${herokuHost}/${id}`)
    .then(result => {
      let post = result.data.data

      viewContent.innerHTML = templates.postContentTemplate(post)

      let editButton = document.querySelector('#post-edit')
      let deleteButton = document.querySelector('#post-delete')

      editButton.addEventListener('click', editPostButton)
      deleteButton.addEventListener('click', deletePostButton)
    })
    .catch(console.error)
}

///// CREATE
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

//// UPDATE
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

//// DELETE
function deletePostButton(){
  let deletePostId = document.querySelector('#post-id').innerHTML

  axios.delete(`${herokuHost}/${deletePostId}`)
  .then(result => {
    viewContent.innerHTML = ''
    renderMenu()
  })
  .catch(console.error)
}

renderMenu()

function generateForm(){
  viewContent.innerHTML = templates.createFormTemplate()
  viewContent.addEventListener('submit', createPost)
}

createButton.addEventListener('click', generateForm)

},{"./templates":2}],2:[function(require,module,exports){
const renderMenuTemplate = (post) => {
  return `
    <a class="list-group-item list-group-item-action" data-id="${post.id}" data-toggle="list" href="#${post.id}" role="tab">${post.name}</a>`
}

const createFormTemplate = () => {
  return `
  <form id="create-form">
    <div class="form-group">
      <label for="name">Recipe name</label>
      <input id="create-name" type="text" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="content">Recipe</label>
      <textarea id="create-recipe" type="text" class="form-control" rows="8" required></textarea>
    </div>
    <button id="create-submit" type="submit" class="btn btn-outline-primary">Save Recipe</button>
  </form>`
}

const updateFormTemplate = () => {
  return `
    <form id="update-form">
      <p id="update-id" class="d-none"></p>
      <div class="form-group">
        <label for="name">Recipe name</label>
        <input id="update-name" type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="content">Recipe</label>
        <textarea id="update-recipe" type="text" class="form-control" rows="8" required></textarea>
      </div>
      <button id="update-submit" type="submit" class="btn btn-outline-primary">Save Recipe</button>
    </form>`
}


const postContentTemplate = (post) => {
  return `
    <div class="tab-recipe" id="nav-tabContent">
      <div class="tab-pane fade show active" role="tabpanel">
        <p id="post-id" class="d-none">${post.id}</p>
        <h1 id="post-name">${post.name}</h1>
        <hr>
        <p id="post-recipe">${post.recipe}</p>
        <button id="post-edit" class="btn btn-outline-info">Edit Recipe</button>
        <button id="post-delete" class="btn btn-outline-danger">Delete Recipe</button>
      </div>
    </div>`
}

module.exports = {
  renderMenuTemplate,
  updateFormTemplate,
  createFormTemplate,
  postContentTemplate
}

},{}]},{},[1]);

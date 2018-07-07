(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const templates = require(`./templates`)
const herokuHost = `https://nameless-refuge-32795.herokuapp.com/posts`
// const localHost = `http://localhost:3000/posts`

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
  axios.put(`${herokuHost}/${id}`, {title, content})
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
  let title = document.querySelector('#create-title').value
  let content = document.querySelector('#create-content').value
  axios.post(`${herokuHost}`, {title, content})
  .then(result => {
    viewContent.innerHTML = ''
    renderMenu()
  })
  .catch(console.error)

}

createButton.addEventListener('click', generateForm)

},{"./templates":2}],2:[function(require,module,exports){
const renderMenuTemplate = (post) => {
  return `
    <a class="list-group-item list-group-item-action" data-id="${post.id}" data-toggle="list" href="#${post.id}" role="tab">${post.title}</a>`
}

const updateFormTemplate = () => {
  return `
    <form id="update-form">
      <p id="update-id" class="d-none"></p>
      <div class="form-group">
        <label for="title">Title</label>
        <input id="update-title" type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea id="update-content" type="text" class="form-control" rows="6" required></textarea>
      </div>
      <button id="update-submit" type="submit" class="btn btn-outline-primary">Submit</button>
    </form>`
}

const createFormTemplate = () => {
  return `
    <form id="create-form">
      <div class="form-group">
        <label for="title">Title</label>
        <input id="create-title" type="text" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea id="create-content" type="text" class="form-control" rows="6" required></textarea>
      </div>
      <button id="create-submit" type="submit" class="btn btn-outline-primary">Submit</button>
    </form>`
}

const postContentTemplate = (post) => {
  return `
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" role="tabpanel">
        <p id="post-id" class="d-none">${post.id}</p>
        <h1 id="post-title">${post.title}</h1>
        <hr>
        <p id="post-content">${post.content}</p>
        <br>
        <button id="post-edit" class="btn btn-outline-info btn-sm">Edit</button>
        <button id="post-delete" class="btn btn-outline-danger btn-sm">Delete</button>
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

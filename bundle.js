(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const createButton = document.querySelector('#create-button')
const sidebar = document.querySelector('#sidebar')
const viewContent = document.querySelector('#view-content')
// const postForm = document.querySelector('#post-form')
// const postTitle = document.querySelector('#post-title').value
// const postContent = document.querySelector('#post-content').value

function renderMenu() {
  const listTabContainer = document.querySelector('#list-tab')
  // listTabContainer.innerHTML = ''
  axios.get(`http://localhost:3000/posts`)
    .then(result => {
      let posts = result.data.data
      // console.log(posts)

      const listTabMenu = posts.map(post => {
        return `<a class="list-group-item list-group-item-action" id="${post.id}" data-toggle="list" href="#list-${post.id}" role="tab">${post.title}</a>`
      }).join('')

      listTabContainer.innerHTML = listTabMenu

      const listTabs = document.querySelectorAll('a')

      listTabs.forEach(listTab => listTab.addEventListener('click', function(event) {
        event.preventDefault()
        let listTabId = listTab.getAttribute('id')
        renderPost(listTabId)
      }))
    })
    .catch(console.error)
}

renderMenu()

function renderPost(id){
  const navTabContent = document.querySelector('#nav-tabContent')
  axios.get(`http://localhost:3000/posts/${id}`)
    .then(result => {
      let post = result.data.data
      console.log(post)
      let postContent = `
      <div class="tab-pane fade show active" id="list-${post.id}" role="tabpanel">
        <h1>${post.title}</h1>
        <hr>
        <p>${post.content}</p>
        <br>
        <button id="edit-post" class="btn btn-outline-info btn-sm">Edit</button>
        <button id="delete-post" class="btn btn-outline-danger btn-sm">Delete</button>
      </div>`
      console.log(postContent)

      navTabContent.innerHTML = postContent
    })
    .catch(console.error)
}


function generateForm() {
  let form = `
  <form id="create-form">
    <div class="form-group">
      <label for="title">Title</label>
      <input id="create-title" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label for="content">Content</label>
      <textarea id="create-content" type="text" class="form-control" rows="6"></textarea>
    </div>
    <button id="create-submit" type="submit" class="btn btn-outline-primary">Submit</button>
  </form>`
  viewContent.innerHTML = form
  return viewContent
}

createButton.addEventListener('click', generateForm)

},{}]},{},[1]);

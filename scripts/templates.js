const renderMenuTemplate = (post) => {
  return `
    <a class="list-group-item list-group-item-action" data-id="${post.id}" data-toggle="list" href="#${post.id}" role="tab">${post.title}</a>`
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
  <textarea id="create-content" type="text" class="form-control" rows="10" required></textarea>
  </div>
  <button id="create-submit" type="submit" class="btn btn-outline-primary">Submit</button>
  </form>`
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
        <textarea id="update-content" type="text" class="form-control" rows="10" required></textarea>
      </div>
      <button id="update-submit" type="submit" class="btn btn-outline-primary">Submit</button>
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
        <button id="post-edit" class="btn btn-outline-info">Edit</button>
        <button id="post-delete" class="btn btn-outline-danger">Delete</button>
      </div>
    </div>`
}

module.exports = {
  renderMenuTemplate,
  updateFormTemplate,
  createFormTemplate,
  postContentTemplate
}

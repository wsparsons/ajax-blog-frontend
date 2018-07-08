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
  <textarea id="create-recipe" type="text" class="form-control" rows="10" required></textarea>
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
        <textarea id="update-recipe" type="text" class="form-control" rows="10" required></textarea>
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

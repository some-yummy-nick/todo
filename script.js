(function () {
  var doc = document,
    field = doc.getElementById("js-field"),
    list = doc.getElementById("js-list"),
    listitems = list.querySelectorAll("li"),
    numForlabel = listitems.length,
    form = doc.getElementById("js-form");

    numForlabel++;

  listitems.forEach(function(child) {
    bindEvents(child);
  });

  function addElement(value) {
    var li = doc.createElement("li"),
      checkbox = doc.createElement("input"),
      buttonEdit = doc.createElement("button"),
      buttonDelete = doc.createElement("button"),
      inputField = doc.createElement("input"),
      label = doc.createElement("label");

    label.setAttribute("for", "check" + numForlabel);
    label.append(value);

    checkbox.setAttribute("id", "check" + numForlabel);
    checkbox.setAttribute("class", "checkbox");
    checkbox.setAttribute("type", "checkbox");

    inputField.classList = "textfield";
    inputField.setAttribute("type", "text");

    buttonEdit.classList = "btn btn--hover js-change";
    buttonEdit.setAttribute("type", "button");
    buttonEdit.innerText = "Изменить";

    buttonDelete.classList = "btn btn--hover js-delete";
    buttonDelete.setAttribute("type", "button");
    buttonDelete.innerText = "Удалить";

    li.append(checkbox);
    li.append(label);
    li.append(inputField);
    li.append(buttonEdit);
    li.append(buttonDelete);

    bindEvents(li);

    list.append(li);

    numForlabel++;
  }

  function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('.js-change');
    const deleteButton = todoItem.querySelector('.js-delete');

    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editField);
    deleteButton.addEventListener('click', deleteField);
  }

  function toggleTodoItem() {
    this.parentNode.querySelector('label').classList.toggle("decoration");
  }

  function editField() {
    var listitem = this.parentNode,
      listLabel = listitem.querySelector("label"),
      editInput = listitem.querySelector(".textfield"),
      isEditing = listitem.classList.contains('editing');

    listLabel.focus();

    if (isEditing) {
      listLabel.innerText = editInput.value;
      this.innerText = 'Изменить';
    } else {
      editInput.value = listLabel.innerText;
      editInput.focus();
      this.innerText = 'Сохранить';
    }

    this.parentNode.classList.toggle("editing");
  }

  function deleteField() {
    this.parentNode.parentNode.removeChild(this.parentNode);
  }

  function submitForm(event) {
    if (field.value) {
      addElement(field.value);
      field.value = "";
    }
    event.preventDefault();
  }

  form.addEventListener("submit", submitForm);

})();
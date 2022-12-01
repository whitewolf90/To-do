console.log('Script started');
const addToDoBtn = document.getElementById('add-to-do-btn');
const toDoInput = document.getElementsByTagName('input')[0];
const toDoContainer = document.querySelector('#to-do-container');
const doneContainer = document.querySelector('#done-container');

function preserveLists() {
  const allToDos = Array.from(
    document.querySelectorAll('.to-do-instance.inprogress p')
  ).map((el) => el.textContent);
  window.sessionStorage.setItem('todos', allToDos);

  const allDones = Array.from(document.querySelectorAll('.to-do-instance.done p')).map(
    (el) => el.textContent
  );
  window.sessionStorage.setItem('dones', allDones);
}

function loadLists() {
  let loadedToDos = window.sessionStorage.getItem('todos');
  if (loadedToDos) {
    loadedToDos = loadedToDos.split(',').filter((el) => el);
  }
  if (loadedToDos && loadedToDos.length > 0) {
    loadedToDos.forEach((toDo) => {
      toDoContainer.appendChild(createItem(toDo, 'inprogress'));
    });
  }
  let loadedDones = window.sessionStorage.getItem('dones');
  if (loadedDones) {
    loadedDones = loadedDones.split(',').filter((el) => el);
  }
  if (loadedDones && loadedDones.length > 0) {
    loadedDones.forEach((toDo) => {
      doneContainer.appendChild(createItem(toDo, 'done'));
    });
  }
}

function createItem(text, status) {
  const divElement = document.createElement('div');
  divElement.classList.add('to-do-instance');
  divElement.classList.add(status);
  const inputCheckbox = document.createElement('input');
  inputCheckbox.type = 'checkbox';
  inputCheckbox.checked = status === 'done';
  inputCheckbox.addEventListener('click', (e) => {
    if (e.target.checked) {
      toDoContainer.removeChild(divElement);
      doneContainer.appendChild(divElement);
      divElement.classList.remove('inprogress');
      divElement.classList.add('done');
    } else {
      doneContainer.removeChild(divElement);
      toDoContainer.appendChild(divElement);
      divElement.classList.remove('done');
      divElement.classList.add('inprogress');
    }
    preserveLists();
  });

  const pElement = document.createElement('p');
  pElement.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.addEventListener('click', () => {
    divElement.remove();
    preserveLists();
  });

  divElement.appendChild(inputCheckbox);
  divElement.appendChild(pElement);
  divElement.appendChild(deleteBtn);

  return divElement;
}

function addToDo() {
  const validText = toDoInput.value.trim();
  if (validText) {
    const newToDo = createItem(validText, 'inprogress');
    toDoContainer.appendChild(newToDo);
    toDoInput.value = '';
    preserveLists();
  } else {
    alert('Please type in some text');
  }
}

addToDoBtn.addEventListener('click', addToDo);

loadLists();

addToDoBtn.addEventListener("click", addToDo);
toDoInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addToDo();
  }
});
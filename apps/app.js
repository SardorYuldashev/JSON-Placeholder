const main = document.querySelector('.main__content')
const buttons = document.querySelectorAll('.header__content-button');
const usersBox = document.querySelector('.main__users');
const usersTable = document.querySelector('.main__users-table');
const postBox = document.querySelector('.main__posts');
const postsTable = document.querySelector('.main__posts-table');
const commentsBox = document.querySelector('.main__comments');
const photoBox = document.querySelector('.main__photos');
const todoBox = document.querySelector('.main__todos');
const todoWrapper = document.querySelector('.main__todos-wrapper');
const todoBtns = document.querySelectorAll('.main__todos-btn');

async function getUsers() {
  let promise = await fetch("https://jsonplaceholder.typicode.com/users");
  let data = await promise.json();
  data.forEach(item => {
    createUsersTable(item)
  })
}

getUsers();

function createUsersTable({ name, username: info, email, address: { city, street }, company: { name: job }, phone }) {

  const row = document.createElement('tr');
  row.classList.add('main__users-row');

  const userName = document.createElement('td');
  userName.classList.add('main__users-name');
  userName.textContent = name;

  const userInfo = document.createElement('td');
  userInfo.classList.add('main__users-info');
  userInfo.textContent = info;

  const userEmail = document.createElement('td');
  userEmail.classList.add('main__users-email');
  userEmail.textContent = email;

  const userCity = document.createElement('td');
  userCity.classList.add('main__users-city');
  userCity.textContent = city;

  const userStreet = document.createElement('td');
  userStreet.classList.add('main__users-street');
  userStreet.textContent = street;

  const userCompany = document.createElement('td');
  userCompany.classList.add('main__users-company');
  userCompany.textContent = job;

  const userPhone = document.createElement('td');
  userPhone.classList.add('main__users-phone');
  userPhone.textContent = phone;

  row.appendChild(userName);
  row.appendChild(userInfo);
  row.appendChild(userEmail);
  row.appendChild(userCity);
  row.appendChild(userStreet);
  row.appendChild(userCompany);
  row.appendChild(userPhone);

  usersTable.append(row)
};

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('posts')) {
      postsTable.innerHTML = '';
      postBox.style.display = 'block';

      usersBox.style.display = 'none';
      commentsBox.style.display = 'none';
      photoBox.style.display = 'none';
      todoBox.style.display = 'none';

      async function getPosts() {
        let promise = await fetch("https://jsonplaceholder.typicode.com/posts");
        let posts = await promise.json();
        posts.forEach(item => {
          createPostsTable(item);
        });
      };
      getPosts();
    } else if (btn.classList.contains('users')) {
      usersTable.innerHTML = '';
      usersBox.style.display = 'block';

      postBox.style.display = 'none';
      commentsBox.style.display = 'none';
      photoBox.style.display = 'none';
      todoBox.style.display = 'none';

      async function getUsers() {
        let promise = await fetch("https://jsonplaceholder.typicode.com/users");
        let data = await promise.json();
        data.forEach(item => {
          createUsersTable(item);
        })
      }
      getUsers();
    } else if (btn.classList.contains('comments')) {
      commentsBox.innerHTML = '';
      commentsBox.style.display = 'flex';

      postBox.style.display = 'none';
      usersBox.style.display = 'none';
      photoBox.style.display = 'none';
      todoBox.style.display = 'none';

      async function getComments() {
        let promise = await fetch("https://jsonplaceholder.typicode.com/comments");
        let data = await promise.json();
        data.forEach(item => {
          createComments(item);
        })
      }
      getComments();
    } else if (btn.classList.contains('photos')) {
      photoBox.innerHTML = '';
      photoBox.style.display = 'flex';
      
      commentsBox.style.display = 'none';
      postBox.style.display = 'none';
      usersBox.style.display = 'none';
      todoBox.style.display = 'none';


      async function getPhotos() {
        let promise = await fetch("https://jsonplaceholder.typicode.com/photos");
        let data = await promise.json();
        data.forEach(item => {
          createPhotos(item);
        })
      }
      getPhotos();
    } else if (btn.classList.contains('todos')) {
      todoWrapper.innerHTML = '';
      todoBox.style.display = 'block';
      
      commentsBox.style.display = 'none';
      postBox.style.display = 'none';
      usersBox.style.display = 'none';
      photoBox.style.display = 'none';

      async function getToDo() {
        let promise = await fetch("https://jsonplaceholder.typicode.com/todos");
        let data = await promise.json();
        data.forEach(item => {
          createToDo(item);
        })
      }
      getToDo();
    };
  });
});

function createPostsTable({ id, title }) {

  const row = document.createElement('tr');
  row.classList.add('main__posts-row');

  const postID = document.createElement('td');
  postID.classList.add('main__posts-name');
  postID.textContent = id;

  const postTitle = document.createElement('td');
  postTitle.classList.add('main__posts-info');
  postTitle.textContent = title;

  row.appendChild(postID);
  row.appendChild(postTitle);

  postsTable.append(row)
};

function createComments ({name: comTitle, body: comText, email: comEmail, id: comID} ) {
  const card = document.createElement('div');
  card.classList.add('main__comments-card');

  const title = document.createElement('h2');
  title.classList.add('main__comments-title');
  title.textContent = comTitle;

  const text = document.createElement('p');
  text.classList.add('main__comments-text');
  text.textContent = comText;

  const info = document.createElement('div');
  info.classList.add('main__comments-info');  

  const email = document.createElement('p');
  email.classList.add('main__comments-email');
  email.textContent = comEmail;

  const id = document.createElement('p');
  id.classList.add('main__comments-id');
  id.textContent = `ID: ${comID}`;

  info.appendChild(id);
  info.appendChild(email);

  card.appendChild(title);
  card.appendChild(text);
  card.appendChild(info);

  commentsBox.appendChild(card)
};

function createPhotos ({url, title:itemTitle}) {
  const card = document.createElement('div');
  card.classList.add('main__photos-card');

  const img = document.createElement('img');
  img.classList.add('main__photos-img');
  img.setAttribute('src', url);

  const title = document.createElement('h2');
  title.classList.add('main__photos-title');
  title.textContent = itemTitle;

  card.appendChild(img);
  card.appendChild(title);

  photoBox.appendChild(card);
};

function createToDo({id: itemID, completed: itemCompleted, title: itemTitile}) {
  const card = document.createElement('div');
  card.classList.add('main__todos-card');

  const id = document.createElement('p');
  id.classList.add('main__todos-id');
  id.textContent = itemID;

  const completed = document.createElement('p');
  completed.classList.add('main__todos-completed');
  completed.textContent = `Completed: ${itemCompleted}`;

  const title = document.createElement('p');
  title.classList.add('main__todos-title');
  title.textContent = itemTitile;

  card.appendChild(id);
  card.appendChild(completed);
  card.appendChild(title);

  todoWrapper.appendChild(card);
};

todoBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('all')) {
      todoWrapper.innerHTML = '';
      async function getToDo() {
        let promise = await fetch("https://jsonplaceholder.typicode.com/todos");
        let data = await promise.json();
        data.forEach(item => {
          createToDo(item);
        })
      }
      getToDo();
    } else if (btn.classList.contains('completed')) {
      todoWrapper.innerHTML = '';
      async function getToDo() {
        let promise = await fetch("https://jsonplaceholder.typicode.com/todos");
        let data = await promise.json();
        let newData = data.filter(item => item.completed === true);
        newData.forEach(item => {
          createToDo(item);
        })
      }
      getToDo();
    } else if (btn.classList.contains('notCompleted')) {
      todoWrapper.innerHTML = '';
      async function getToDo() {
        let promise = await fetch("https://jsonplaceholder.typicode.com/todos");
        let data = await promise.json();
        let newData = data.filter(item => item.completed === false);
        console.log(newData.length);
        newData.forEach(item => {
          createToDo(item);
        });
      };
      getToDo();
    };
  });
});









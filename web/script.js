document.addEventListener('DOMContentLoaded', () => {

  async function fetchUsers() {
    try {
      const response = await fetch('/users');
      const users = await response.json();
      const userList = document.getElementById('user-list');
      userList.innerHTML = ''; // Очистить текущий список

      // Перерисовать список пользователей
      users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.classList.add('user-item');

        userItem.innerHTML = `
          <span>${user.name} ${user.surname}, Age: ${user.age}, Email: ${user.email}</span>
          <div>
            <button class="edit" data-id="${user._id}">✏️</button>
            <button class="delete" data-id="${user._id}">🗑️</button>
            <button class="copy-email" data-email="${user.email}">📋</button>
          </div>
        `;

        userList.appendChild(userItem);
      });

      // Добавить обработчики для кнопок "удалить"
      const deleteButtons = document.querySelectorAll('.delete');
      deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
          const userId = event.target.getAttribute('data-id');
          await deleteUser(userId);
        });
      });

      // Добавить обработчики для кнопок "редактировать"
      const editButtons = document.querySelectorAll('.edit');
      editButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
          const userId = event.target.getAttribute('data-id');
          await editUser(userId);
        });
      });

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // Добавить нового пользователя
  async function addUser(event) {
    event.preventDefault();

    const name = document.getElementById('nameInput').value;
    const surname = document.getElementById('surnameInput').value;
    const age = document.getElementById('ageInput').value;
    const email = document.getElementById('emailInput').value;

    if (!name || !surname || !age || !email) return;

    try {
      await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, surname, age, email }),
      });

      // Очистить форму
      document.getElementById('userForm').reset();

      // Обновить список пользователей
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }

  

  // Обработчик формы
  const userForm = document.getElementById('userForm');
  if (userForm) {
    userForm.addEventListener('submit', addUser);
  }

  // Инициализация списка пользователей
  fetchUsers();
});


document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-user-form');

  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const userId = document.getElementById('search-user-id').value;
    const searchResult = document.getElementById('search-result');

    if (!userId) {
      searchResult.innerHTML = '<p style="color: red;">Please enter a valid user ID.</p>';
      return;
    }

    try {
      const response = await fetch(`/users/${userId}`);
      if (!response.ok) {
        searchResult.innerHTML = '<p style="color: red;">User not found.</p>';
        return;
      }

      const user = await response.json();
      searchResult.innerHTML = `
        <div class="user-item">
          <span><strong>${user.name} ${user.surname}</strong>, Age: ${user.age}, Email: ${user.email}</span>
        </div>
      `;
    } catch (error) {
      console.error('Error searching user:', error);
      searchResult.innerHTML = '<p style="color: red;">Error fetching user data.</p>';
    }
  });
});


async function sortUsers() {
  const sortBy = document.getElementById('sort').value;
  
  try {
      const response = await fetch('/users');
      let users = await response.json();

      if (sortBy === 'name') {
          users.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === 'age') {
          users.sort((a, b) => a.age - b.age);
      }

      const userList = document.getElementById('user-list');
      userList.innerHTML = '';

      users.forEach(user => {
          const userItem = document.createElement('div');
          userItem.classList.add('user-item');
          userItem.innerHTML = `
              <span>${user.name} ${user.surname}, Age: ${user.age}, Email: ${user.email}</span>
              <div>
                  <button class="edit" data-id="${user._id}">✏️</button>
                  <button class="delete" data-id="${user._id}">🗑️</button>
                  <button class="copy-email" data-email="${user.email}">📋</button>

              </div>
          `;
          userList.appendChild(userItem);
      });
      // Добавить обработчики для кнопок "удалить"
      const deleteButtons = document.querySelectorAll('.delete');
      deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
          const userId = event.target.getAttribute('data-id');
          await deleteUser(userId);
        });
      });

      // Добавить обработчики для кнопок "редактировать"
      const editButtons = document.querySelectorAll('.edit');
      editButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
          const userId = event.target.getAttribute('data-id');
          await editUser(userId);
        });
      });
      
  } catch (error) {
      console.error('Error sorting users:', error);
  }
}


document.addEventListener('click', (event) => {
  if (event.target.classList.contains('copy-email')) {
    const email = event.target.getAttribute('data-email');
    navigator.clipboard.writeText(email).then(() => {
      alert(`Copied: ${email}`);
    }).catch(err => console.error('Error copy:', err));
  }
});



function emailValidator(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}


async function deleteUser(userId) {
  try {
    await fetch(`/users/${userId}`, {
      method: 'DELETE',
    });

    // Удаляем элемент из DOM, чтобы сразу увидеть изменения
    document.querySelector(`.delete[data-id="${userId}"]`).closest('.user-item').remove();
  } catch (error) {
    console.error('Error deleting user:', error);
  }
}


// Редактировать пользователя
async function editUser(userId) {
  const name = prompt('Enter the new first name:');
  const surname = prompt('Enter the new last name:');
  const age = prompt('Enter the new age:');
  const email = prompt('Enter the new email:');

  if (!name || !surname || !age || !email) {
    alert('All fields must be filled out');
    return;
  }
  if (!(age>=1 || age<=120)){
    alert('Input correct age')
    return
  }
  

  if (!emailValidator(email)) {
      alert('Enter a valid email address');
      return;
  }


  try {
    await fetch(`/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, surname, age, email }),
    });

    // Найди нужного пользователя в DOM и обнови его данные
    const userItem = document.querySelector(`.edit[data-id="${userId}"]`).closest('.user-item');
    if (userItem) {
      userItem.querySelector('span').innerHTML = `${name} ${surname}, Age: ${age}, Email: ${email}`;
    }
  } catch (error) {
    console.error('Error editing user:', error);
  }
}
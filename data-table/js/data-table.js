document.addEventListener("DOMContentLoaded", () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let editIndex = null;

    const userTableBody = document.getElementById("userTableBody");
    const userModal = document.getElementById("userModal");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const addUserBtn = document.getElementById("addUserBtn");
    const saveUserBtn = document.getElementById("saveUserBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const searchInput = document.getElementById("search");

    // Display users in the table
    function displayUsers() {
        userTableBody.innerHTML = "";
        users.forEach((user, index) => {
            const userRow = `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.active ? 'Active' : 'Inactive'}</td>
                    <td class="actions">
                        <button class="edit" onclick="editUser(${index})">Edit</button>
                        <button class="delete" onclick="deleteUser(${index})">Delete</button>
                        <button class="toggle" onclick="toggleUserState(${index})">
                            ${user.active ? 'Deactivate' : 'Activate'}
                        </button>
                    </td>
                </tr>
            `;
            userTableBody.innerHTML += userRow;
        });
    }

    // Add new user
    addUserBtn.addEventListener("click", () => {
        openModal("Add User");
    });

    saveUserBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const newUser = {
            username: usernameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            active: true
        };
        if (editIndex === null) {
            users.push(newUser);
        } else {
            users[editIndex] = newUser;
            editIndex = null;
        }
        localStorage.setItem("users", JSON.stringify(users));
        closeModal();
        displayUsers();
    });

    cancelBtn.addEventListener("click", closeModal);

    // Edit user
    window.editUser = (index) => {
        editIndex = index;
        const user = users[index];
        openModal("Edit User");
        usernameInput.value = user.username;
        emailInput.value = user.email;
        phoneInput.value = user.phone;
    };

    // Delete user
    window.deleteUser = (index) => {
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        displayUsers();
    };

    // Toggle user state (active/inactive)
    window.toggleUserState = (index) => {
        users[index].active = !users[index].active;
        localStorage.setItem("users", JSON.stringify(users));
        displayUsers();
    };

    // Search filter
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();
        const filteredUsers = users.filter(user =>
            user.username.toLowerCase().includes(searchText) ||
            user.email.toLowerCase().includes(searchText) ||
            user.phone.toLowerCase().includes(searchText)
        );
        userTableBody.innerHTML = "";
        filteredUsers.forEach((user, index) => {
            const userRow = `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.active ? 'Active' : 'Inactive'}</td>
                    <td class="actions">
                        <button class="edit" onclick="editUser(${index})">Edit</button>
                        <button class="delete" onclick="deleteUser(${index})">Delete</button>
                        <button class="toggle" onclick="toggleUserState(${index})">
                            ${user.active ? 'Deactivate' : 'Activate'}
                        </button>
                    </td>
                </tr>
            `;
            userTableBody.innerHTML += userRow;
        });
    });

    // Modal functions
    function openModal(title) {
        document.getElementById("modalTitle").innerText = title;
        userModal.style.display = "block";
        usernameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
    }

    function closeModal() {
        userModal.style.display = "none";
        editIndex = null;
    }

    // Initial display
    displayUsers();
});

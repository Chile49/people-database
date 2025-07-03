// Initialize people list if empty
if (!localStorage.getItem('people')) {
    const initialPeople = [
        { name: 'AMOS BAHATI KASANGA', regNumber: '240242416691', region: 'SONGEA', favourite: 'WEB DEVELOPMENT' },
        { name: 'IBRAHIM RAMADHAN JUMA', regNumber: '240242435923', region: 'IRINGA', favourite: 'MAINTANANCE' },
        { name: 'KELVIN FREDY MOSHA', regNumber: '240242246609', region: 'DODOMA', favourite: 'DIGITAL' },
        { name: 'ABUBAKARI HAMAD MSUMAI', regNumber: '240242467561', region: 'KIGOMA', favourite: 'MICROPROCESSOR' },
        { name: 'VICTOR NKUMINGI DAVID', regNumber: '240242458495', region: 'KILIMANJARO', favourite: 'ANALOGUE' },
        { name: 'ISMAIL RAMADHAN HAMIS', regNumber: '240242488559', region: 'SIMIYU', favourite: 'PROGRAMMING' },
        { name: 'ESSAU JOSEPH QAMARA', regNumber: '240242488559', region: 'TABORA', favourite: 'MICROSOFT OFFICE' },
        { name: 'JOHN NDALAHWA JOCHE', regNumber: '240242479905', region: 'TANGA', favourite: 'NETWORKING' },
    ];
    localStorage.setItem('people', JSON.stringify(initialPeople));
}

// Load people list on page load
function loadPeople() {
    const tbody = document.getElementById('people-tbody');
    if (!tbody) return;
    const people = JSON.parse(localStorage.getItem('people')) || [];
    tbody.innerHTML = '';
    people.forEach(person => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.regNumber}</td>
            <td>${person.region}</td>
            <td>${person.favourite}</td>
        `;
        tbody.appendChild(row);
    });
}

// Register user
function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const message = document.getElementById('reg-message');

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        message.textContent = 'Email already registered!';
        message.style.color = 'red';
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    message.textContent = 'Registration successful! Please sign in.';
    message.style.color = 'green';
    document.getElementById('registration-form').reset();
}

// Sign in user
function signInUser(event) {
    event.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    const message = document.getElementById('signin-message');

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        message.textContent = 'Sign-in successful! Redirecting...';
        message.style.color = 'green';
        setTimeout(() => {
            window.location.href = 'people.html';
        }, 1000);
    } else {
        message.textContent = 'Invalid email or password!';
        message.style.color = 'red';
    }
}

// Add new person
function addPerson(event) {
    event.preventDefault();
    const name = document.getElementById('person-name').value;
    const regNumber = document.getElementById('person-reg').value;
    const region = document.getElementById('person-region').value;
    const favourite = document.getElementById('person-favourite').value;
    const message = document.getElementById('add-person-message');

    let people = JSON.parse(localStorage.getItem('people')) || [];
    if (people.some(person => person.regNumber === regNumber)) {
        message.textContent = 'Registration number already exists!';
        message.style.color = 'red';
        return;
    }

    people.push({ name, regNumber, region, favourite });
    localStorage.setItem('people', JSON.stringify(people));
    message.textContent = 'Person added successfully!';
    message.style.color = 'green';
    document.getElementById('add-person-form').reset();
    loadPeople();
}

// Load people list when people.html loads
if (window.location.pathname.includes('people.html')) {
    loadPeople();
}
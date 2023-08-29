document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    function saveContacts() {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    function renderContacts() {
        contactList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${contact.name}</span>
                <span>${contact.phone}</span>
                <button class="edit" data-index="${index}">Editar</button>
                <button class="delete" data-index="${index}">Borrar</button>
            `;
            contactList.appendChild(li);
        });
    }

    function addContact(name, phone) {
        contacts.push({ name, phone });
        saveContacts();
        renderContacts();
    }

    function editContact(index, newName, newPhone) {
        contacts[index].name = newName;
        contacts[index].phone = newPhone;
        saveContacts();
        renderContacts();
    }

    function deleteContact(index) {
        contacts.splice(index, 1);
        saveContacts();
        renderContacts();
    }

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phoneInput = document.getElementById('phone');
        const phone = phoneInput.value;

       
        if (!/^\d{9}$/.test(phone)) {
            alert('Por favor, ingresa un número de teléfono válido de 9 dígitos.');
            return;
        }

        addContact(name, phone);
        contactForm.reset();
    });

    contactList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            deleteContact(index);
        } else if (event.target.classList.contains('edit')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            const newName = prompt('Ingrese el nuevo nombre:', contacts[index].name);
            let newPhone = null;
            do {
                newPhone = prompt('Ingrese el nuevo número de teléfono (9 dígitos):', contacts[index].phone);
            } while (newPhone !== null && (!/^\d{9}$/.test(newPhone)));

            if (newName !== null && newPhone !== null) {
                editContact(index, newName, newPhone);
            }
        }
    });

    renderContacts();
});

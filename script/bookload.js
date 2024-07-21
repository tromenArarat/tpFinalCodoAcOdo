// document.addEventListener('DOMContentLoaded', () => {
//     fetch('/check-auth', { method: 'GET', credentials: 'include' })
//         .then(response => response.json())
//         .then(data => {
//             if (data.loggedIn) {
//                 document.getElementById('bookForm').style.display = 'block';
//                 document.getElementById('auth-message').style.display = 'none';
//                 loadTematicas();
//             } else {
//                 document.getElementById('auth-message').style.display = 'block';
//                 document.getElementById('bookForm').style.display = 'none';
//             }
//         })
//         .catch(err => console.error('Error checking auth:', err));
// });

document.addEventListener('DOMContentLoaded', () => {
    loadTematicas();
});

function loadTematicas() {
    fetch('http://localhost:3000/tematicas')
        .then(response => response.json())
        .then(tematicas => {
            const tematicaSelect = document.getElementById('tematica_id');
            tematicas.forEach(tematica => {
                const option = document.createElement('option');
                option.value = tematica.tematica_id;
                option.textContent = tematica.name;
                tematicaSelect.appendChild(option);
            });
            tematicaSelect.appendChild(new Option('Add New', 'new'));
        })
        .catch(err => console.error('Error loading tematicas:', err));
}

document.getElementById('tematica_id').addEventListener('change', (event) => {
    if (event.target.value === 'new') {
        const newTematica = prompt('Enter new theme name:');
        if (newTematica) {
            fetch('http://localhost:3000/tematicas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newTematica })
            })
                .then(response => response.json())
                .then(data => {
                    const newOption = document.createElement('option');
                    newOption.value = data.tematica_id;
                    newOption.textContent = data.name;
                    newOption.selected = true;
                    event.target.appendChild(newOption);
                })
                .catch(err => console.error('Error creating new tematica:', err));
        }
    }
});

document.getElementById('bookForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const bookData = Object.fromEntries(formData.entries());

    // Handle detalle separately
    const detalleFields = ['isbn', 'editorial', 'idioma', 'traductor', 'formato', 'lanzamiento', 'adicional', 'pdf'];
    bookData.detalle = {};
    detalleFields.forEach(field => {
        if (formData.get(field)) {
            bookData.detalle[field] = formData.get(field);
        }
    });

    try {
        const response = await fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        alert(`Book created with ID: ${result.bookId}`);
    } catch (error) {
        console.error('Error creating book:', error);
        alert('Error creating book');
    }
});

document.getElementById('toggleDetalle').addEventListener('click', () => {
    const detalleSection = document.getElementById('detalleSection');
    detalleSection.style.display = detalleSection.style.display === 'none' ? 'block' : 'none';
});

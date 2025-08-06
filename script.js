const API_URL = 'http://localhost:7000/arboles';

document.addEventListener('DOMContentLoaded', () => {
    cargarArboles();

    const form = document.getElementById('arbolForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombreArbol').value;
        const tipoHoja = document.getElementById('tipoHoja').value;
        const tipoSuelo = document.getElementById('tipoSuelo').value;
        const idCuidador = parseInt(document.getElementById('idCuidador').value);

        const arbol = { nombreArbol: nombre, tipoHoja, tipoSuelo, idCuidador };

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(arbol)
            });

            if (res.ok) {
                form.reset();
                cargarArboles();
            } else {
                alert('Error al registrar el árbol');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

async function cargarArboles() {
    const loader = document.getElementById('loader');
    const tbody = document.querySelector('#arbolesTable tbody');
    loader.style.display = 'block';
    tbody.innerHTML = '';

    try {
        const res = await fetch(API_URL);
        const arboles = await res.json();

        arboles.forEach(arbol => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${arbol.idArbol}</td>
                <td>${arbol.nombreArbol}</td>
                <td>${arbol.tipoHoja}</td>
                <td>${arbol.tipoSuelo}</td>
                <td>${arbol.idCuidador}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loader.style.display = 'none';
    }
}

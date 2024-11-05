document.addEventListener('DOMContentLoaded', () => {
    // Botón para la búsqueda por continente
    document.getElementById('continentSearchBtn').addEventListener('click', () => {
        fetch('//3.87.248.147/php-intro-connection/index.php/')
            .then(response => response.json())
            .then(location => {
                return fetch(`//3.87.248.147/php-intro-connection/getRecords.php?table=city&continent=${location.continent_name}`);
            })
            .then(response => response.json())
            .then(data => {
                console.log('Resultados por continente:', data);
                displayResults(data);
            })
            .catch(error => {
                console.error('Error en la búsqueda por continente:', error);
            });
    });

    // Botón para la búsqueda por país
    document.getElementById('countrySearchBtn').addEventListener('click', () => {
        fetch('../index.php')
            .then(response => response.json())
            .then(location => {
                return fetch(`//3.87.248.147/php-intro-connection/getRecords.php?table=city&country=${location.country_name}`);
            })
            .then(response => response.json())
            .then(data => {
                console.log('Resultados por país:', data);
                displayResults(data);
            })
            .catch(error => {
                console.error('Error en la búsqueda por país:', error);
            });
    });

    // Función para mostrar los resultados en la tabla
    function displayResults(data) {
        const tableHeader = document.getElementById('tableHeader');
        const tableBody = document.getElementById('tableBody');

        // Limpiar la tabla
        tableHeader.innerHTML = '';
        tableBody.innerHTML = '';

        if (data.length > 0) {
            // Crear encabezados de la tabla
            const headers = Object.keys(data[0]);
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
                tableHeader.appendChild(th);
            });

            // Crear filas de la tabla
            data.forEach(row => {
                const tr = document.createElement('tr');
                headers.forEach(header => {
                    const td = document.createElement('td');
                    td.textContent = row[header];
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        } else {
            // Mostrar mensaje si no hay resultados
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = headers.length;
            td.textContent = 'No se encontraron resultados.';
            td.classList.add('text-center');
            tr.appendChild(td);
            tableBody.appendChild(tr);
        }
    }
});

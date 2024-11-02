// Función para obtener registros de una tabla específica
function getRecords(table) {
    axios.get(`//34.201.91.60/php-intro-connection/getRecords.php?table=${table}`)
      .then(function(response) {
        const thead = document.getElementById('tableHead');
        const tbody = document.getElementById('records');
        tbody.innerHTML = ''; // Limpiar la tabla
  
        if (table === 'city') {
          thead.innerHTML = `
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nombre</th>
              <th scope="col">Código de País</th>
              <th scope="col">Distrito</th>
              <th scope="col">Población</th>
            </tr>`;
          response.data.forEach(record => {
            const row = `<tr>
                          <td>${record.ID}</td>
                          <td>${record.Name}</td>
                          <td>${record.CountryCode}</td>
                          <td>${record.District}</td>
                          <td>${record.Population}</td>
                        </tr>`;
            tbody.innerHTML += row;
          });
        } else if (table === 'country') {
          thead.innerHTML = `
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nombre</th>
              <th scope="col">Continente</th>
              <th scope="col">Región</th>
              <th scope="col">Población</th>
            </tr>`;
          response.data.forEach(record => {
            const row = `<tr>
                          <td>${record.Code}</td>
                          <td>${record.Name}</td>
                          <td>${record.Continent}</td>
                          <td>${record.Region}</td>
                          <td>${record.Population}</td>
                        </tr>`;
            tbody.innerHTML += row;
          });
        } else if (table === 'countrylanguage') {
          thead.innerHTML = `
            <tr>
              <th scope="col">Código de País</th>
              <th scope="col">Idioma</th>
              <th scope="col">Es Oficial</th>
              <th scope="col">Porcentaje</th>
            </tr>`;
          response.data.forEach(record => {
            const row = `<tr>
                          <td>${record.CountryCode}</td>
                          <td>${record.Language}</td>
                          <td>${record.IsOfficial}</td>
                          <td>${record.Percentage}</td>
                        </tr>`;
            tbody.innerHTML += row;
          });
        }
      })
      .catch(function(error) {
        console.error('Error al obtener los registros:', error);
      });
  }
  
  // Asignar el evento change al menú desplegable
  document.getElementById('actionSelect').addEventListener('change', function() {
    const selectedTable = this.value;
  
    // Ejecutar la consulta correspondiente según la tabla seleccionada
    getRecords(selectedTable);
  });
  

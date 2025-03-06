<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DATOSSSSS</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <section id="datosFormulario"></section>

    <script type="text/babel">
        class DatosFormulario extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    datos: [],
                    x: '',
                    y: '',
                    z: ''
                };
            }

            // Fetch data from the API
            componentDidMount() {
                fetch('http://localhost:3000/datos')
                    .then(response => response.json())
                    .then(data => {
                        console.log('Fetched Data:', data); // Log data for debugging
                        this.setState({ datos: data });
                    })
                    .catch(error => console.error('Error fetching data:', error));
            }

            // Handle form submission
            handleSubmit = (event) => {
                event.preventDefault();
                const { x, y, z } = this.state;

                // Prepare the data to send in the POST request
                const newData = { x, y, z };

                // Send a POST request to localhost:3000/datos
                fetch('http://localhost:3000/datos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                })
                .then(response => response.json())
                .then(data => {
                    // After successfully posting the data, reload the page to get the updated data
                    window.location.reload();
                })
                .catch(error => console.error('Error posting data:', error));
            }

            // Handle input changes
            handleInputChange = (event) => {
                const { name, value } = event.target;
                this.setState({ [name]: value });
            }

            // Handle delete request (with x, y, z as parameters)
            handleDelete = (x, y, z) => {
                console.log('Deleting:', x, y, z); // Debugging log for delete request
                // Send a DELETE request to localhost:3000/datos with x, y, z as parameters
                fetch(`http://localhost:3000/datos?x=${x}&y=${y}&z=${z}`, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    // After successfully deleting the item, update the state
                    this.setState(prevState => ({
                        datos: prevState.datos.filter(item => item.x !== x || item.y !== y || item.z !== z)
                    }));
                })
                .catch(error => console.error('Error deleting data:', error));
            }

            render() {
                return (
                    <div>
                        <form id="formulario" onSubmit={this.handleSubmit}>
                            <label htmlFor="x">Valor de X (Número):</label>
                            <input 
                                type="number" 
                                id="x" 
                                name="x" 
                                value={this.state.x} 
                                onChange={this.handleInputChange} 
                                required 
                            />

                            <label htmlFor="y">Valor de Y (Número):</label>
                            <input 
                                type="number" 
                                id="y" 
                                name="y" 
                                value={this.state.y} 
                                onChange={this.handleInputChange} 
                                required 
                            />

                            <label htmlFor="z">Valor de Z (Texto):</label>
                            <input 
                                type="text" 
                                id="z" 
                                name="z" 
                                value={this.state.z} 
                                onChange={this.handleInputChange} 
                                required 
                            />

                            <button type="submit">Agregar a la Tabla</button>
                        </form>

                        <h2>Datos en la Tabla</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                    <th>Acciones</th> {/* Added Actions column for delete */}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.datos && this.state.datos.length > 0 ? (
                                    this.state.datos.map((dato, index) => (
                                        <tr key={index}>
                                            <td>{dato.x}</td>
                                            <td>{dato.y}</td>
                                            <td>{dato.z}</td>
                                            <td>
                                                <button 
                                                    onClick={() => this.handleDelete(dato.x, dato.y, dato.z)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No hay datos disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                );
            }
        }

        ReactDOM.render(<DatosFormulario />, document.getElementById('datosFormulario'));
    </script>
</body>
</html>

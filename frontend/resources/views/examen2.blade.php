<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Examen 2 CARLOS ARIZPE HERNANDEZ</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <header>
        <h1>EXAMEN 2 CARLOS ARIZPE HERNANDEZ </h1>
    </header>
    <main id="main">
    </main>
</body>
<script type="text/babel">
    class Master extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                mapas: []
            }
            this.getData = this.getData.bind(this);
        }
        async getData(){
                const url = "http://localhost:3000/mapa/all";
                try{
                    const res = await fetch(url);
                    const data = await res.json();

                    this.setState({
                        mapas: data
                    })

                    console.log(data);
                }catch(error){}
            }

        componentDidMount(){
            this.getData();
        }
        render(){
            return(
                <section>
                    <Form getData={this.getData}/>
                    <List getData={this.getData} mapas={this.state.mapas}/>
                </section>

            )
        }

    }

    class Form extends React.Component {
        constructor(props){
            super(props);
            this.handleSubmitForm = this.handleSubmitForm.bind(this);
        }

        async handleSubmitForm(event){
                event.preventDefault();
                const formData = new FormData(event.target);
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });

                const url = "http://localhost:3000/mapa/new";
                try{
                    await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    })
                    .then(res => res.json())
                    .then(data => {
                         console.log('Success:', data);
                         this.props.getData();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                }catch(err){}
            }


        render(){
            return(
                <form onSubmit={this.handleSubmitForm}>
                    <h2>Crear Mapa</h2>
                    <label for="latitud">Latitud: </label>
                    <input type="number" id="latitud" name="latitud"/>
                    <label for="longitud">Longitud: </label>
                    <input type="number" id="longitud" name="longitud"/>
                    <label for="altitud">Altitud: </label>
                    <input type="number" id="altitud" name="altitud"/>
                    <label for="nombre">Nombre: </label>
                    <input type="text" id="nombre" name="nombre"/>
                    <label for="direccion">Direccion: </label>
                    <input type="text" id="direccion" name="direccion"/>
                    <button>Crear Mapa</button>
                </form>
            )
        }
    }
    class Form2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapa: [],
            latitud: '',
            longitud: '',
            altitud: ''
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    async handleSubmitForm(event) {
        event.preventDefault();
        const { latitud, longitud, altitud } = this.state;

        // Validación de los campos
        if (!latitud || !longitud || !altitud) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const url = `http://localhost:3000/mapa/${latitud}/${altitud}/${longitud}`;
        try {
            const res = await fetch(url);
            if (res.ok) {
                const responseData = await res.json();  // Procesamos la respuesta
                this.setState(prevState => ({
                    mapa: [...prevState.mapa, responseData]
                }));
            }
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitForm}>
                <h2>Buscar Mapa</h2>
                <label htmlFor="latitud">Latitud: </label>
                <input
                    type="number"
                    id="latitud"
                    name="latitud"
                    value={this.state.latitud}
                    onChange={this.handleChange}
                />
                <label htmlFor="longitud">Longitud: </label>
                <input
                    type="number"
                    id="longitud"
                    name="longitud"
                    value={this.state.longitud}
                    onChange={this.handleChange}
                />
                <label htmlFor="altitud">Altitud: </label>
                <input
                    type="number"
                    id="altitud"
                    name="altitud"
                    value={this.state.altitud}
                    onChange={this.handleChange}
                />
                <button type="submit">Buscar Mapa</button>
                <div>
                    {this.state.mapa.length === 0 ? (
                        null
                    ) : (
                        this.state.mapa.map((data, index) => (
                            <div key={index}>
                                <p>Latitud: {data.latitud}</p>
                                <p>Longitud: {data.longitud}</p>
                                <p>Altitud: {data.altitud}</p>
                                <p>Nombre: {data.nombre}</p>
                                <p>Direccion: {data.direccion}</p>
                            </div>
                        ))
                    )}
                </div>
            </form>
        );
    }
}

    class List extends React.Component {
        constructor(props){
            super(props);
        }
        async handleRemove(longitud, latitud, altitud){
                const url=`http://localhost:3000/mapa/${longitud}/${latitud}/${altitud}`
                const datos = {
                    longitud: longitud,
                    latitud: latitud,
                    altitud: altitud
                }
                try{
                    await fetch(url, {
                        method: "DELETE",
                        body: JSON.stringify(datos),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    this.props.getData();
                }catch(error){}
            }
        render(){
            return(
                <article>
                    <h2>Lista de Mapas</h2>
                    {this.props.mapas.map(mapa=>(
                        <ul key={mapa.id}>
                            <li>Longitud = {mapa.longitud} </li>
                            <li>Latitud = {mapa.latitud} </li>
                            <li>Altitud = {mapa.altitud} </li>
                            <li>Nombre = {mapa.nombre} </li>
                            <li>Direccion = {mapa.direccion} </li>
                            <button onClick={()=> this.handleRemove(mapa.longitud,
                                mapa.latitud, mapa.altitud
                            )}>borrar</button>
                        </ul>
                    ))}
                </article>
            )
        }
    }
    ReactDOM.render(<Master/>, document.getElementById("main"));
</script>
</html>
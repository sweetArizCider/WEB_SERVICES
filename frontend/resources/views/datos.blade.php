<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DATOSSSSS</title>
    <link rel="stylesheet" href="{{ asset('css/datos.css') }}"/>
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <section id="app">

    </section>
    <script type="text/babel">
        class App extends React.Component{
            constructor(props){
                super(props);
                this.state = {
                    datos: []
                }
                this.getData = this.getData.bind(this);
            }
            componentDidMount(){
                this.getData();
            }
            async getData(){
                const url = "http://localhost:3000/datos";
                try{
                    const res = await fetch(url);
                    const data = await res.json();

                    this.setState({
                        datos: data
                    })

                    console.log(data);
                }catch(error){}
            }

            render(){
                return(
                    <article id="main">
                        <DataForm getData={this.getData}/>
                        <DataList getData={this.getData} datos={this.state.datos}/>
                    </article>
                )
            }

        }
        class DataForm extends React.Component{
            constructor(props){
                super(props);
                this.handleSubmit = this.handleSubmit.bind(this);

            }

            async handleSubmit(event){
                event.preventDefault();
                const formData = new FormData(event.target);
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });

                const url = "http://localhost:3000/datos";
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
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                    this.props.getData();

                }catch(err){}
            }



            render(){
                return(
                    <article>
                        <form onSubmit={this.handleSubmit}>
                            <label for="x">X:</label>
                            <input type="number" id="x" name="x"/>

                            <label for="y">Y:</label>
                            <input type="number" id="y" name="y"/>

                            <label for="z">Z:</label>
                            <input type="text" id="z" name="z"/>

                            <button type="submit" >Submit</button>
                        </form>
                    </article>
                )
            }
        }

        class DataList extends React.Component{
            constructor(props){
                super(props);
                this.handleRemove = this.handleRemove.bind(this);
            }

            async handleRemove(id){
                const url="http://localhost:3000/datos"
                try{
                    await fetch(url, {
                        method: "DELETE",
                        body: JSON.stringify({id}),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    this.props.getData();
                }catch(error){}
            }

            render(){
                return(
                    <article id="list">
                        
                            {this.props.datos.map(value=>(
                            <ul key={value.id}>
                                <li>X = {value.x} </li>
                                <li>Y = {value.y} </li>
                                <li>Z = {value.z} </li>
                                <button onClick={()=> this.handleRemove(value.id)}>borrar</button>
                            </ul>
                             ))}
                       
                    </article>
                )
            }
        }
        ReactDOM.render(<App/>, document.getElementById('app'));

    </script>
</body>
</html>

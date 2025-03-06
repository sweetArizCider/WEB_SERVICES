<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create User</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>

<body>
    <div class="container mt-5">
        <h2>Create User</h2>
        <div id="createUserFormContainer"></div>
    </div>
    <script type="text/babel">
        class CreateUserForm extends React.Component {
            handleSubmit = (event) => {
                event.preventDefault();
                const formData = new FormData(event.target);
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });

                // Ensure 'enabled' field is set to false by default
                if (!data.hasOwnProperty('enabled')) {
                    data['enabled'] = false;
                }

                fetch('http://localhost:3000/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }

            render() {
                return (
                    <form id="createUserForm" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" name="username" required maxLength="50" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" required pattern="^[a-zA-ZÑñ0-9_.!$#%@]{6,16}$" maxLength="16" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">First Name</label>
                            <input type="text" className="form-control" id="name" name="name" required maxLength="100" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" required maxLength="100" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="secondLastName">Second Last Name</label>
                            <input type="text" className="form-control" id="secondLastName" name="secondLastName" maxLength="100" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" required maxLength="100" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="enabled">Enabled</label>
                            <select className="form-control" id="enabled" name="enabled" required defaultValue="false">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Create User</button>
                    </form>
                );
            }
        }

        ReactDOM.render(<CreateUserForm />, document.getElementById('createUserFormContainer'));
    </script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>

</html>
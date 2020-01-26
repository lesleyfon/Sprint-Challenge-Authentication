import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = React.useState([]);
  React.useEffect(()=>{
    fetchJokes()
  },[localStorage.getItem('token')])

  const fetchJokes= () =>{
    if (localStorage.getItem("token")) {
      axios({
        method: "GET",
        url: "http://localhost:3300/api/jokes",
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(res => {
          console.log(res.data)
          setData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
 
  return (
    <div className="App">
      <LogInForm />
      
      {(data.length < 1 || !data) ? <p>NO data jokes :( sorry </p> : <ul>  {data.map(jokes => <li key={jokes.id}> {jokes.joke}</li>)} </ul>}
       
    </div>
  );
}

function LogInForm() {
  const fetchUser = user => {
    axios
      .post("http://localhost:3300/api/auth/login", user)
      .then(response => {
        localStorage.setItem("token", response.data.token);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const [user, setUser] = React.useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const submitUser = e => {
    e.preventDefault();

    fetchUser(user);
  };
  return (
    <Form inline onSubmit={submitUser}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleEmail" className="mr-sm-2">
          Email
        </Label>
        <Input
          type="text"
          name="username"
          onChange={handleChange}
          id="exampleEmail"
          placeholder="something@idk.cool"
        />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">
          Password
        </Label>
        <Input
          type="password"
          name="password"
          onChange={handleChange}
          id="examplePassword"
          placeholder="don't tell!"
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default App;

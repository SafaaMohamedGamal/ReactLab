import React, {Component} from "react"
import { Redirect } from 'react-router-dom'

class Login extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false
    }
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    fetch("http://todoapp.ahmedrohym.com/api.php?apicall=login", {
      method: "POST",
      // headers: [
      //   {"Access-Control-Allow-Origin": "*"},
      //   {"Content-Type": "application/json"},
      // ],
      body: JSON.stringify(this.state)
    })
    .then(response=>response.json())
    .then((logged)=>{
      let token = logged.user.token
      let name = logged.user.username
      console.log(logged.user);
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      this.props.loggedIn();
    })
    .catch(error=>{
      console.log("error ", error);
    });
  }


  render()
  {
    return (
      <div className="container text-center">
        <form>
          <label>
            username
            <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}/>
          </label>
          <br />
          <label>
            password
            <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}/>
          </label>
          <br />
          <button  onClick={this.handleSubmit}>Submit</button>
          <br />
        </form>
      </div>
    );
  }
}

export default Login

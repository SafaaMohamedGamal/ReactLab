import React, {Component} from "react"

class Register extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      username: "",
      email: "",
      gender:"",
      password: ""
    }
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    fetch("http://todoapp.ahmedrohym.com/api.php?apicall=signup", {
      method: "POST",
      // headers: [
      //   {"Access-Control-Allow-Origin": "*"},
      //   {"Content-Type": "application/json"},
      // ],
      body: JSON.stringify(this.state)
    }).then(response=>{
      console.log("response ", response.json());
    }).catch(error=>{
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
            email
            <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}/>
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="gender"
            value="male"
            onClick={this.handleChange}/>
            Male
          </label>
          <br />
          <label>
            <input
            type="radio"
            name="gender"
            value="female"
            onClick={this.handleChange}/>
            Female
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

export default Register

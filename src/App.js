import React from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Register from './components/Register.js'
import Login from './components/Login.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


class App extends React.Component {
  constructor()
  {
    super();
  }

  render() {
    return (
      <div>
        <Header />
      </div>
      );
  }
}


class BoxList extends React.Component {
  constructor()
  {
    super();
    this.state = {
      data: [
        "Attend Lec2",
        "Complete Lab2",
        "Complete Bonus"
      ]
    };
  }

  addItem=(item)=>
  {
    this.state.data.push(item)
    this.setState({data: this.state.data});
  }
  deleteItem=(item)=>
  {
    this.state.data.splice(item,1);
    this.setState({data: this.state.data});
  }
  render() {
    return (
      <div>
        <TodoBox list={this.state.data} addItem={this.addItem} deleteItem={this.deleteItem}/>
      </div>
      );
  }
}



class TodoBox extends React.Component
{
  render() {
    return (
      <div className="container mt-3 p-5 bg-light border border-warning">
        <h3>TodoList</h3>
          <TodoList list={this.props.list} deleteItem={this.props.deleteItem}/>
          <TodoAdd addItem={this.props.addItem}/>
      </div>
      );
  }
}

class TodoList extends React.Component
{
  render() {
    return (
      <div className="container border border-success">
        <ul className="p-0">
          {
            this.props.list.map((item, i) =>

                <TodoItem key={i} id={i} item={item} deleteItem={this.props.deleteItem}/>
            )
          }
        </ul>
      </div>
      );
  }
}

class TodoItem extends React.Component
{
  constructor()
  {
    super();
    this.state={
      selected: false
    }
  }
  itemSelected=()=>{
    this.selected=!this.selected;
    this.setState({selected: this.selected})
  }
  itemDelete=()=>{
    this.selected=false;
    let id = this.props.id;
    this.props.deleteItem(id);
  }
  render() {
    return (
          <li id={this.props.id} className={this.selected?"list-group-item m-3 list-group-item-info": "list-group-item m-3 list-group-item-warning"}>
            <div className="d-flex justify-content-between">
              <div>{this.props.item}</div>
              <div>
                <button onClick={this.itemSelected} className="bg-success mx-2">&#9989;</button>
                <button onClick={this.itemDelete} className="bg-danger text-light mx-2">&#x2718;</button>
              </div>
            </div>
          </li>

      );
  }
}

class TodoAdd extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {value: 'Task Name'};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.addItem(this.state.value);
    this.setState({value:'Task Name'})
    document.querySelector('input').value=''
  }
  render() {
    return (
      <div className="container mt-5">
        <form className="form-inline justify-content-center" onSubmit={this.handleSubmit}>
          <div className="form-group mb-2">
            <label>Task</label>
            </div>
          <div className="form-group mx-sm-3 mb-2">
            <input type="text" className="form-control" id="staticEmail2" name="name" placeholder={this.state.value} onChange={this.handleChange}/>
          </div>
          <input type="submit" className="btn btn-success mb-2" value="Add"/>
        </form>
      </div>
      );
  }
}

function LoggedIn(props)
{
  let logged = localStorage.getItem('token');
  if (logged)
  {
    let name = localStorage.getItem('name');
    return(<>
        <li>
          <span>{name}</span>
        </li>
        <li>
          <Link to="/logout" onClick={props.loggedOut}>Logout</Link>
        </li>
    </>
    );
  }
  else {
    return(
      <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
    </>
    );
  }
}


class Header extends React.Component
{
  constructor()
  {
    super();
    this.state={
      redirect: false
    }
  }
  loggedIn=()=>{
    this.setState({redirect: true})
    }
  loggedOut=()=>{
    this.setState({redirect: false})
      let logged = localStorage.getItem('token');
      if(logged){
        localStorage.clear();
      }
    }

  render(){
  return(
        <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <LoggedIn loggedOut={this.loggedOut}/>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            {()=>this.state.redirect? <Redirect to='/' />:<Login loggedIn={this.loggedIn} />}
          </Route>
          <Route path="/logout">
            {()=><Redirect to='/login' />}
          </Route>
          <Route path="/">
            {()=>this.state.redirect?<BoxList />:<Redirect to='/login' />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
  }
}
function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}


export default App;

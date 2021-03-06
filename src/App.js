import React, { Component } from 'react';
import styles from './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      { id: 141, name: 'Max', age: 28 },
      { id: 242, name: 'Manu', age: 29 },
      { id: 989, name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( { persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    let persons = null;
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangeHandler(event, person.id)} />
          })}          
        </div>
      );

      btnClass = styles.Red;

    }

    let classes = [];

    if(this.state.persons.length <= 2) {
      classes.push(styles.red);
    }
    if(this.state.persons.length <=1) {
      classes.push(styles.bold);
    }
    
    return (
      <div className={styles.App}>
        <h1>Hi, this is a react app</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <button 
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}      
      </div>
    );
  }
}

export default App;

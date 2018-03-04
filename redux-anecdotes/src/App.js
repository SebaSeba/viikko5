import React from 'react';
import actionFor from './actionCreators'

class App extends React.Component {
  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    this.props.store.dispatch(
      actionFor.anecdoteCreation(content)
    )
    event.target.content.value = ''
  }
  vote = (event) => {
    event.preventDefault()
    let anecdotes = this.props.store.getState()
    let anecdote = anecdotes.find(anecdote => anecdote.id === event.target.id)
    anecdote.votes = anecdote.votes + 1
    anecdotes = anecdotes.map(a => a.id !== anecdote.id ? a : anecdote)
    this.props.store.dispatch(
      actionFor.vote(anecdotes)
    )
  }
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote} id={anecdote.id}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="content" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}


export default App
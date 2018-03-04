const actionFor = {
  anecdoteCreation(content) {
    return {
      type: 'new_anecdote',
      content: content
    }
  },
  vote(anecdotes) {
    return {
      type: 'vote',
      anecdotes: anecdotes
    }
  }
}

export default actionFor
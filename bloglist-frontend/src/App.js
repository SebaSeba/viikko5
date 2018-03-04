import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import TogglableBlog from './components/TogglableBlog'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      user: null,
      error: null,
      loginVisible: false,
      success: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      console.log(user.token)
      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      this.setState({
        username: '',
        password: '',
        user
      })

      this.setState({ success: 'login success' })
      setTimeout(() => {
        this.setState({ success: null })
      }, 3000);
    } catch (exception) {
      this.setState({ error: 'wrong username or password' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 3000);
    }
  }

  logout = async (event) => {
    event.preventDefault()
    this.setState({
      user: null
    })
    window.localStorage.removeItem('loggedBlogAppUser')

    this.setState({ success: `logged out` })
    setTimeout(() => {
      this.setState({ success: null })
    }, 3000);
  }

  handleLoginFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleBlogFormFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  addblog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    blogService.create(blogObject).then(newBlog => {
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        title: '',
        author: '',
        url: ''
      })
    })

    this.setState({ success: `a new blog ${blogObject.title} by ${blogObject.author} added` })
    setTimeout(() => {
      this.setState({ success: null })
    }, 3000);

  }

  render() {
    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm className="loginForm"
          visible={this.state.loginVisible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login} />
      </Togglable>
    )

    const blogForm = () => (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.addblog}>
          title<input type="text" name="title" value={this.state.title} onChange={this.handleBlogFormFieldChange} />
          <br />
          author<input type="text" name="author" value={this.state.author} onChange={this.handleBlogFormFieldChange} />
          <br />
          url<input type="text" name="url" value={this.state.url} onChange={this.handleBlogFormFieldChange} />
          <button>save</button>
        </form>
      </div>
    )

    const blogList = () => (
      <div className="blogList">
        <h1>blogs</h1>
        {this.state.user.name} logged in <button onClick={this.logout}>logout</button>
        <br />
        <br />
        <div>
          {this.state.blogs.map(blog =>
            <TogglableBlog key={blog.id} buttonLabel={blog.title} closeButtonLabel={blog.title}><Blog blog={blog} /></TogglableBlog>
          )}
        </div>
        {blogForm()}
      </div >
    )

    return (
      <div>
        <Notification message={this.state.success} />
        <Notification message={this.state.error} />
        <br />
        {this.state.user === null ? loginForm() : blogList()}
      </div>
    );
  }
}

export default App;

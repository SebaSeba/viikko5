import React from 'react'
import { shallow, mount } from 'enzyme'
import App from './App'
jest.mock('./services/blogs')
import blogService from './services/blogs'


describe('<App />', () => {
  it('does not render blogs when user is not logged in', () => {
    const appComponent = mount(<App />)

    const blogList =appComponent.find('.blogList')
    const loginForm = appComponent.find('.loginForm')

    expect(blogList.length).toBe(0)
    expect(loginForm.text()).toContain('Kirjaudu')
  })
})
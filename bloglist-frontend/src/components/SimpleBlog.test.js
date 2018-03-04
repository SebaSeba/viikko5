import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.skip('<SimpleBlog />', () => {
  it('renders info and likes', () => {
    const simpleBlog = {
      title: 'Eka testi',
      author: 'Erkki Pertti',
      likes: 3
    }

    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} />)
    const infoDiv = blogComponent.find('.info')
    const likesDiv = blogComponent.find('.likes')

    expect(infoDiv.text()).toContain(simpleBlog.title)
    expect(infoDiv.text()).toContain(simpleBlog.author)
    expect(likesDiv.text()).toContain(simpleBlog.likes)
  })

  it('calls event handler every time like button is clicked', () => {
    const simpleBlog = {
      title: 'Yksi blogi',
      author: 'Esa Esa',
      likes: 4
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={simpleBlog} onClick={mockHandler} />)

    const button = blogComponent.find('button')

    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
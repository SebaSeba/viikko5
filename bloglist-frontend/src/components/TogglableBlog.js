import React from 'react'

class TogglableBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <div onClick={this.toggleVisibility}>{this.props.buttonLabel}</div>
        </div>
        <div style={showWhenVisible}>
          <div onClick={this.toggleVisibility}>{this.props.closeButtonLabel}</div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default TogglableBlog
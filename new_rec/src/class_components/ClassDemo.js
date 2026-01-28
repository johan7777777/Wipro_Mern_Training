import React from 'react'

 class ClassDemo extends React.Component {

  render() {
    return (
      <div>
        <h2>Hi, {this.props.username} working with react {this.props.company}</h2>
      </div>
    )
  }
}

export default ClassDemo
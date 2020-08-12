import React, { Component } from 'react';

class UsersTable extends Component {
  constructor(props)
  {
    super(props);
    this.state = {}
  }

  render() {
    return (
        <tr>
            <td>{this.props.idx}</td>
            <td>{this.props.data._id}</td>
            <td>{this.props.data.nickName}</td>
            <td>{this.props.data.content}</td>
            <td>{this.props.data.createdAt}</td>
            <td>{this.props.data.__v}</td>            
        </tr>
    )
  }
}

export default UsersTable
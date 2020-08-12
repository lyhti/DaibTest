import React, { Component } from 'react';
import axios from 'axios';
import UsersTable from './UsersTable'

class Users extends Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
      dataList: [],
      date : new Date(),
      nickName : "",
      content : ""
    }
  }

  componentWillMount()
  {
    axios(
        {
          method: 'get',
          url: "http://dauth.daios.net/v1/boards",
          headers:
          {
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNWVkZGRmMDYxNDAwMTE4Y2EzNmYiLCJpYXQiOjE1OTcxMzY2MDUsImV4cCI6MTU5NzIyMzAwNX0.9wHVjRkt0aY5oNtXqQBS-flbsCw3xzJbN0Cnt7ZGKDo',
              'Content-Type': 'application/json'
          }
        }).then((res) =>
        {
            this.setState({
                dataList : res.data.data
              });
        })
        .catch(err =>
        {
            console.log("실패")
        })


  }

  dataSubmit = (e) =>
  {
    // 전송버튼 클릭 시 자동 새로고침 막기.
    e.preventDefault();
    
    if(this.state.nickName.length !== 0 && this.state.content.length !== 0)
    {
        axios(
        {
            method: 'post',
            url: "http://dauth.daios.net/v1/boards",
            headers:
            {
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjMyNWVkZGRmMDYxNDAwMTE4Y2EzNmYiLCJpYXQiOjE1OTcxMzY2MDUsImV4cCI6MTU5NzIyMzAwNX0.9wHVjRkt0aY5oNtXqQBS-flbsCw3xzJbN0Cnt7ZGKDo',
                'Content-Type': 'application/json'
            },
            data:
            {
                content: this.state.content,
                createdAt : this.state.date,
                nickName: this.state.nickName
            }
        }).then((res) =>
        {
            console.log("성공")
        })
        .catch(err =>
        {
            console.log("실패")
        })
        
        // 전송 시 0.5초 딜레이.
        setTimeout(() =>
        {
        window.location.reload();
        }, 500)
    }

    else
    {
        alert("닉네임 및 내용을 입력해주세요");
    }
    
  }

  onKeyChange = (e) =>
  {
      this.setState({
          [e.target.name] : e.target.value
      })
  }


  render()
  {
    return (
        <div>
            <form onSubmit = {this.dataSubmit}>
                <input type="text" value={this.state.nickName} onChange={this.onKeyChange}
                    name="nickName" placeholder="닉네임입력"/>
                <input type="text" value={this.state.content} onChange={this.onKeyChange}
                    name="content" placeholder="내용입력"/>
                <button type="submit">전송</button>
            </form>
            <h3>최신 순으로 출력 됩니다.</h3>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Id</th>
                        <th>닉네임</th>
                        <th>내용</th>
                        <th>생성일</th>
                        <th>Version</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.dataList.reverse().map((data, index) => 
                        (
                            <UsersTable data = {data} key = {index}
                                idx = {this.state.dataList.length - index}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
  }
}

export default Users
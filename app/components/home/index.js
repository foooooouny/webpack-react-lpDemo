// 主页面，列表页
import React, { Component } from 'react';
import { postData, postUrcodeData } from 'Actions'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cntList: []
    }
  }

  componentDidMount() {
    let testList = [
      {
        label: 'hello1',
        value: '点击我去 detail ',
        num: 1
      },
      {
        label: 'hello2',
        value: '点击我去 detail ',
        num: 2
      },
      {
        label: 'hello3',
        value: '点击我去 detail ',
        num: 3
      }
    ],
    cntList = [];
    testList.map((item) => [
      cntList.push(<li key={ item.num } className="home-cnt-item"><div>{ item.label }</div><div onClick={ this.itemClick.bind(this) }>{ item.value }</div></li>)
    ])
    this.setState({
      cntList
    })
  }

  itemClick() {
    this.props.history.push('/detail')
  }

  render() {
    return (
      <div>
        HomePage
        <ul className="home-cnt-ul">
          { this.state.cntList }
        </ul>
      </div>
    )
  }
}

export default HomePage;
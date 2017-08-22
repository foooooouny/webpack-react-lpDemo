// 主页面，列表页
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import lpAes from 'Util/aesT';
// import { AESEnc, AESDec, getKey } from 'Util/aes';
import { postData, postUrcodeData, lpPostSecretUrcodeD, parseDecryptD } from 'Api'
import { DatePicker } from 'antd'
import moment from 'moment'

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cntList: [],
      defaultDate: '2015-01-01'
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
      cntList.push(<li key={ item.num } className="home-cnt-item"><div>{ item.label }</div><div onClick={ this.itemClick.bind(this, item.label) }>{ item.value }</div></li>)
    ])
    this.setState({
      cntList
    })

  }

  // 加密接口请求demo
  

  itemClick(v) {
    this.props.history.push(`/detail/${v}`)
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
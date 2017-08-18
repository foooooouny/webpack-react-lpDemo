// 主页面，列表页
import React, { Component } from 'react';
// import lpAes from 'Util/aesT';
// import { AESEnc, AESDec, getKey } from 'Util/aes';
import { postData, postUrcodeData, lpPostSecretUrcodeD, parseDecryptD } from 'Api';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

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

  initHashData() {
    // 解析地址栏hash数据，得到对象
    let oGetVars = new (function (sSearch) {
      let rNull = /^\s*$/,
          rBool = /^(true|false)$/i;
      let buildValue = (sValue) => {
        if (rNull.test(sValue)) {
          return null;
        }
        if (rBool.test(sValue)) {
          return sValue.toLowerCase() === 'true';
        }
        if (isFinite(sValue)) {
          return sValue;
        }
        if (isFinite(Date.parse(sValue))) {
          return new Date(sValue);
        }

        return sValue;
      }
      if (sSearch.length > 1) {
        for (let aItKey, nKeyId = 0, aCouples = sSearch.substr(1).split('&'); nKeyId < aCouples.length; nKeyId++) {
          aItKey = aCouples[nKeyId].split('=');
          this[decodeURI(aItKey[0])] = aItKey.length > 1 ? buildValue(decodeURI(aItKey[1])) : null;
        }
      }
    })(window.location.search);

    // 解析浏览器地址获得数据对象
    console.log(oGetVars);
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

HomePage.contextType = {
  getUser: PropTypes.func,
  setUser: PropTypes.func
}

export default HomePage;
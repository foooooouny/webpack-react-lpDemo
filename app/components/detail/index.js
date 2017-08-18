// 详情页
import React, { Component } from 'react';
import { postData, postUrcodeData } from 'Actions'

class Detail extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
  }
  
  backHome() {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        Detail
        <div className="detail-back-home" onClick={ this.backHome.bind(this) }>点击我返回首页</div>
      </div>
    )
  }
}

export default Detail;
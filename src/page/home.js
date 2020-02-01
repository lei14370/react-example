import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {message} from 'antd';
class Page extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const {history}=this.props;
    axios({
      method: 'get',
      url: '/user/userInfo',
    })
        .then(function(response) {
          console.log(response);
          const {data}=response;
          if (!data.success) {
            history.replace('/login');
          } else {

          }
        });
  }
  logout=()=>{
    const {history}=this.props;
    axios({
      method: 'post',
      url: '/user/logout',
    })
        .then(function(response) {
          console.log(response);
          const {data}=response;
          if (data.success) {
            history.replace('/login');
            message.success(data.message);
          }
        });
  }
  render() {
    return (
      <div>
        home <a onClick={this.logout}>注销登录</a>
      </div>
    );
  }
}

export default Page;

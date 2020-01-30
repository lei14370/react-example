import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
class Page extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const {history}=this.props;
    axios({
      method: 'get',
      url: '/user/userInfo',
      data: {
        userId: 'Fred',
      },
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
  render() {
    return (
      <div>
        home
      </div>
    );
  }
}

export default Page;

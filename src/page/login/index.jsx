import './style';
import React from 'react';
import PropTypes from 'prop-types';
import {Form, Icon, Input, Button, Checkbox} from 'antd';

/**
 * 描述
 * @date 2020-01-29
 * @param {any} e
 */
class NormalLoginForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  handleSubmit = (e) => {
    const {form}=this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const {history, form}=this.props;
    const {getFieldDecorator} = form;
    return (
      <div id="components-form-demo-normal-login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{required: true, message: 'Please input your username!'}],
            })(
                <Input
                  prefix={
                    <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="Username"
                />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
                <Input
                  prefix={
                    <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />
                  }
                  type="password"
                  placeholder="Password"
                />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
            Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
            Log in
            </Button>
          Or <a onClick={
              ()=>history.replace('/register')
            }>register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Form.create({name: 'normal_login'})(NormalLoginForm);

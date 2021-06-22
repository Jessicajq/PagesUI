import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'dva';
import ailphaLogo from '../../assets/ailpha-logo.png';
import styles from './index.less';

@connect(({ system, login }) => ({
  system,
  login,
}))
@Form.create()
export default class Devtest extends PureComponent {
  state = {
    needReg: false,
  };

  componentWillMount() {
    // const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'login/queryGetHomeBack',
    //   });
    // }
  }

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: values,
        });
      }
    });
  };

  handleReg = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/queryRegister',
          payload: values,
        });
      }
    });
  };

  handleNeedReg = () => {
    const { needReg } = this.state;
    this.setState({ needReg: !needReg });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { needReg } = this.state;
    return (
      <div className={styles.loginContainer}>
        {!needReg && (
          <div className={styles.loginBox}>
            <div className={styles.backbox}>
              <div className={styles.loginMsg}>
                <div className={styles.textcontent}>
                  <img src={ailphaLogo}></img>
                  <div className={styles.title}>监管态势自动化测试平台</div>
                </div>
              </div>
            </div>
            <div className={styles.frontbox}>
              <div className={styles.login}>
                <h2>登 录</h2>
                <Form onSubmit={this.handleSubmit} className={styles.login_form}>
                  <Form.Item>
                    {getFieldDecorator('username', {
                      rules: [{ required: true, message: '请输入账号！' }],
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="请输入账号"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入密码！' }],
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="请输入密码"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.login_form_button}>
                      登录
                    </Button>
                    <div className={styles.loginFooter}>
                      <a onClick={() => this.handleNeedReg()}>注册</a>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        )}
        {needReg && (
          <Form onSubmit={this.handleReg} className={styles.login_form}>
            <Form.Item>
              <div className={styles.loginFormTitle}>注册账号</div>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入账号！' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="登录账号"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码！' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="登录密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入邮箱！' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="联系邮箱"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={styles.login_form_button}>
                注册
              </Button>
              <a onClick={() => this.handleNeedReg()}>返回登录</a>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}

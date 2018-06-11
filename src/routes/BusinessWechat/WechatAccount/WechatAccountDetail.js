import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, Switch, Avatar,
} from 'antd';
import {message} from 'antd/lib/index';
import {getUrlPar} from '../../../utils/utils';

const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(({user, adminBaseCrud, loading}) => ({
  adminBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.adminBaseCrud,
}))


@connect(({user, businessBaseCrud, loading}) => ({
  businessBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.businessBaseCrud,
}))

@Form.create()
export default class WechatAccountDetail extends PureComponent {
  constructor(props) {
    super(props);
    const urlPar = getUrlPar();
    this.state = {
      wxUser: {},
      user: {
        employeeName: '123',
        userPhone: '456'
      },
      pageData: {id: urlPar.id},
    };
  }


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'businessBaseCrud/fetchDetail',
      payload: {
        modelName: 'Wxuser',
        params: {id: this.state.pageData.id},
      },
      callback: (response) => {
        if (response.success) {
          this.setState({
            wxUser: response.data
          });

          dispatch({
            type: 'adminBaseCrud/fetchDetail',
            payload: {
              modelName: 'User',
              params: {id: response.data.userId},
            },
            callback: (response) => {
              if (response.success) {
                this.setState({
                  user: response.data || {}
                });
              }
            },
          });
        }
      },
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        if(!values.auth){
          values.auth = -1;
        }
        this.props.dispatch({
          type: 'businessBaseCrud/update',
          payload: {
            modelName: 'Wxuser',
            params: values,
          },
          callback: (response) => {
            if (response.success) {
              this.setState({
                wxUser: response.data
              });
            }
          },
        });
      }
    });
  }


  render() {
    const {submitting} = this.props;
    const {getFieldDecorator, getFieldValue} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 10},
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };

    return (
      <Card bordered={false}>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
          style={{marginTop: 8}}
        >
          <FormItem
            {...formItemLayout}
            label="id"
          >
            {getFieldDecorator('id', {
              initialValue: this.state.wxUser.id,
              rules: [{
                required: true
              }],
            })(
              <Input disabled placeholder=""/>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="头像"
          >
            <Avatar shape="square" size="large" icon="user" src={this.state.wxUser.avatarUrl}/>

          </FormItem>

          <FormItem
            {...formItemLayout}
            label="昵称"
          >
            {getFieldDecorator('nickName', {
              initialValue: decodeURI(this.state.wxUser.nickName),
              rules: [{
                required: true, message: '请输入标题',
              }],
            })(
              <Input disabled placeholder=""/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="真实姓名"
          >
            {getFieldDecorator('employeeName', {
              initialValue: this.state.user.employeeName,
            })(
              <Input disabled placeholder=""/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机号"
          >
            {getFieldDecorator('userPhone', {
              initialValue: this.state.user.userPhone,
            })(
              <Input disabled placeholder=""/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="用户openId"
          >
            {getFieldDecorator('perOpenId', {
              initialValue: this.state.wxUser.perOpenId,
              rules: [{
                required: true
              }],
            })(
              <Input disabled placeholder=""/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="认证通过"
          >
            {getFieldDecorator('auth', {
              initialValue: this.state.wxUser.auth,
              valuePropName: 'checked' })(
              <Switch />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="备注"
          >
            {getFieldDecorator('note', {
              initialValue: this.state.wxUser.note,
              rules: [{
                required: true, message: '',
              }],
            })(
              <TextArea style={{minHeight: 32}} rows={4}/>
            )}
          </FormItem>
          <FormItem {...submitFormLayout} style={{marginTop: 32}}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

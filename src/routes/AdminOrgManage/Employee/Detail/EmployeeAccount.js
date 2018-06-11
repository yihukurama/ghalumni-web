import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, Divider,
} from 'antd';
import {message} from "antd/lib/index";
import OrgSelect from "./OrgSelect";
import DepartmentSelect from "./DepartmentSelect";


const FormItem = Form.Item;
const {Option} = Select;
const {RangePicker} = DatePicker;
const {TextArea} = Input;

@connect(({user, adminBaseCrud, loading}) => ({
  adminBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.adminBaseCrud,
}))
@Form.create()
export default class EmployeeAccount extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      responseData: props.responseData,
      pageData: props.pageData,
      hasUserAccount: false
    }
  }


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'adminBaseCrud/fetch',
      payload: {
        modelName: "User",
        params: {employeeId: this.state.pageData.id},
      }, callback: (response) => {
        if (response.success) {
          this.setState({
            responseData: response.data[0],
          });
          if (response.data.length == 0) {
            this.setState({
              hasUserAccount: false
            });
          } else {
            this.setState({
              hasUserAccount: true
            });
          }
        } else {

          message.success('未能获取到该员工信息');
        }

      },
    });
  }


  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.state.hasUserAccount) {
          this.props.dispatch({
            type: 'adminBaseCrud/update',
            payload: {
              modelName: "User",
              params: values,
            }, callback: (response) => {
              if (response.success) {
                this.setState({
                  responseData: response.data
                });

              }

            },
          });
        } else {
          values["employeeId"] = this.state.pageData.id;
          this.props.dispatch({
            type: 'adminBaseCrud/add',
            payload: {
              modelName: "User",
              params: values,
            }, callback: (response) => {
              if (response.success) {
                this.setState({
                  responseData: response.data
                });

              }

            },
          });
        }

      }
    });
  }

  render() {
    const {submitting} = this.props;
    const {getFieldDecorator} = this.props.form;

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
            label="账号id"
          >
            {getFieldDecorator('id', {
              initialValue: this.state.hasUserAccount ? this.state.responseData["id"] : "",

            })(
              <Input disabled={true} placeholder=""/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账号名"
          >
            {getFieldDecorator('username', {
              initialValue: this.state.hasUserAccount ? this.state.responseData["username"] : "",
              rules: [{
                required: true, message: '请输入标题',
              }],
            })(
              <Input placeholder=""/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="重置密码"
          >
            {getFieldDecorator('password', {
              initialValue: this.state.hasUserAccount ? '******' : "",
              rules: [{
                required: true, message: '请输入标题',
              }],
            })(
              <Input placeholder=""/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="备注"
          >
            {getFieldDecorator('note', {
              initialValue: this.state.hasUserAccount ? this.state.responseData["note"] : "",
              rules: [{
                required: false, message: '',
              }],
            })(
              <TextArea style={{minHeight: 32}} rows={4}/>
            )}
          </FormItem>

          <FormItem {...submitFormLayout} style={{marginTop: 32}}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {this.state.hasUserAccount ? "保存修改" : "创建账号"}
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

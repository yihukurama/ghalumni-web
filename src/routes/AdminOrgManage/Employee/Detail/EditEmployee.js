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
export default class EditRole extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      responseData: props.responseData,
      pageData: props.pageData
    }
  }


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'adminBaseCrud/fetchDetail',
      payload: {
        modelName: "Employee",
        params: {id: this.state.pageData.id},
      }, callback: (response) => {
        if (response.success) {
          this.setState({
            responseData: response.data
          });

        } else {

          message.success('未能获取到该员工信息');
        }

      },
    });
  }


  handleSubmit = (e) => {
    console.log(this.state.responseData)
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'adminBaseCrud/update',
          payload: {
            modelName: "Employee",
            params: values,
          }, callback: (response) => {
            if (response.success) {
              this.setState({
                responseData: response.data
              });

            } else {

              message.success('未能获取到该员工信息');
            }

          },
        });
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
            label="员工id"
          >
            {getFieldDecorator('id', {
              initialValue: this.state.responseData["id"],
              rules: [{
                required: true
              }],
            })(
              <Input disabled={true} placeholder=""/>
            )}
          </FormItem>
          <OrgSelect
            form={this.props.form}
            updateData={this.state.responseData}
            formItemLayout={formItemLayout}
          />
          <DepartmentSelect
            form={this.props.form}
            updateData={this.state.responseData}
            formItemLayout={formItemLayout}
          />
          <FormItem
            {...formItemLayout}
            label="员工名"
          >
            {getFieldDecorator('text', {
              initialValue: this.state.responseData["realName"],
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
              initialValue: this.state.responseData["note"],
              rules: [{
                required: false, message: '',
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

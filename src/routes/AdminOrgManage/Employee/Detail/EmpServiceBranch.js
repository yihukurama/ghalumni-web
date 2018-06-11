import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form, Button, Card, Alert, Input,
} from 'antd';
import {message} from "antd/lib/index";
import ServiceBranchTransfer from "./ServiceBranchTransfer";

const FormItem = Form.Item;

@connect(({user, adminBaseCrud, loading}) => ({
  adminBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.adminBaseCrud,
}))
@Form.create()
export default class EmpServiceBranch extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      pageData: props.pageData,
      responseData: {},
      menuMockData: [],      //未选网点
      menuTargetKeys: [],    //需要提交的网点
      menuAllPrivileges: [],
      menuHasPrivileges: [],
      orgId: ""

    },
      this.selectMenuPrivileges = this.selectMenuPrivileges.bind(this);
  }


  componentDidMount() {
    const {dispatch} = this.props;
    //获取所有权限
    dispatch({
      type: 'adminBaseCrud/fetch',
      payload: {
        modelName: "Servicebranch",
        params: {
          orgId: this.state.orgId
        }
      }, callback: (response) => {
        if (response.success) {
          console.log("给所有权限赋值");
          //给所有权限赋值
          this.setState({
            menuAllPrivileges: response.data
          });
          //获取已有权限
          dispatch({
            type: 'adminBaseCrud/fetch',
            payload: {
              modelName: "Empservbranch",
              params: {
                employeeId: this.state.pageData.id
              }
            }, callback: (response) => {
              if (response.success) {
                //给所有权限赋值
                this.setState({
                  menuHasPrivileges: response.data
                });
                this.getMenuMock();
              }

            },
          });

        } else {

          message.success('未能获取查询条件1');
        }

      },
    });

  }


  handleSubmitPrivilege = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        this.props.dispatch({
          type: 'adminBaseCrud/add',
          payload: {
            modelName: "Empservbranch",
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
    });
  }

  render() {
    const {submitting} = this.props;
    const {getFieldDecorator} = this.props.form;
    const submitFormLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 10, offset: 7},
      },
    };

    return (
      <Card bordered={false}>
        <Form
          onSubmit={this.handleSubmitPrivilege}
          hideRequiredMark
          style={{marginTop: 8}}
        >
          <FormItem
            label="员工id"
          >
            {getFieldDecorator('employeeId', {
              initialValue: this.state.pageData.id,
              rules: [{
                required: true
              }],
            })(
              <Input disabled={true} placeholder=""/>
            )}
          </FormItem>
          <ServiceBranchTransfer
            bindIds={"serviceBranchIds"}
            title={"网点配置"}
            allPrivilege={this.state.menuAllPrivileges}
            hasPrivilege={this.state.menuHasPrivileges}
            mockData={this.state.menuMockData}
            targetKeys={this.state.menuTargetKeys}
            selectPrivileges={this.selectMenuPrivileges}
            form={this.props.form}
          />

          <FormItem {...submitFormLayout} style={{marginTop: 32}}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }

  getMenuMock() {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < this.state.menuAllPrivileges.length; i++) {
      if (!this.state.menuAllPrivileges[i].id) {
        continue;
      }
      let data = {
        key: this.state.menuAllPrivileges[i].id,
        title: this.state.menuAllPrivileges[i].text,
        description: `description of content${i + 1}`,
        chosen: false,
      };

      let has = true;
      for (let j = 0; j < this.state.menuHasPrivileges.length; j++) {
        let allPId = this.state.menuAllPrivileges[i];
        let hasPId = this.state.menuHasPrivileges[j];


        if (hasPId["serviceBranchId"] === allPId["id"]) {
          data.chosen = true;
          targetKeys.push(data.key);
        } else {
          has = false;
        }


      }

      mockData.push(data);


    }
    this.setState({
      menuMockData: mockData,
      menuTargetKeys: targetKeys
    });
  }


  selectMenuPrivileges(targetKeys) {
    this.setState({
      menuTargetKeys: targetKeys
    });
  }

}

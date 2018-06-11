import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form, Button, Card, Alert, Input,
} from 'antd';
import {message} from "antd/lib/index";
import PrivilegeTransfer from "./PrivilegeTransfer";

const FormItem = Form.Item;

@connect(({user, adminBaseCrud, loading}) => ({
  adminBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.adminBaseCrud,
}))
@Form.create()
export default class SummitRole extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      pageData: props.pageData,
      responseData: {},
      menuMockData: [],      //未选权限
      menuTargetKeys: [],    //需要提交的权限
      menuAllPrivileges: [],
      menuHasPrivileges: [],
      selectOrgId: ""

    },
      this.selectOrgOnChange = this.selectOrgOnChange.bind(this);
    this.selectMenuPrivileges = this.selectMenuPrivileges.bind(this);
  }


  componentDidMount() {
    console.log("用户角色页面初始化")
    const {dispatch} = this.props;
    dispatch({
      type: 'adminBaseCrud/fetchDetail',
      payload: {
        modelName: "User",
        params: {id: this.state.pageData.id},
      }, callback: (response) => {
        if (response.success) {
          console.log("RoleDetailsDidMount====>" + response.data);
          this.setState({
            responseData: response.data,
            pageData: response.data
          });
          const orgId = response.data.orgId;
          //获取所有权限
          dispatch({
            type: 'adminBaseCrud/fetch',
            payload: {
              modelName: "Role",
              params: {
                orgId: orgId
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
                    modelName: "Userrole",
                    params: {
                      userId: this.state.pageData.id,
                    }
                  }, callback: (response) => {
                    if (response.success) {
                      //给所有权限赋值
                      this.setState({
                        menuHasPrivileges: response.data
                      });
                      this.getMenuMock();
                    } else {

                      message.success('未能获取查询条件2');
                    }

                  },
                });

              } else {

                message.success('未能获取查询条件1');
              }

            },
          });
        } else {

          message.success('未能获取到该角色信息');
        }

      },
    });


  }

  selectOrgOnChange(selectOrgId) {
    console.log("summit的onChange被调用了");
    console.log(selectOrgId);
    this.setState({
      selectOrgId: selectOrgId
    });
    this.resetMenuPrivilege(selectOrgId);
  }


  handleSubmitPrivilege = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        this.props.dispatch({
          type: 'adminBaseCrud/add',
          payload: {
            modelName: "Userrole",
            params: values,
          }, callback: (response) => {
            if (response.success) {
              this.setState({
                responseData: response.data
              });

            } else {

              message.success('未能获取到该角色信息');
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
            label="用户id"
          >
            {getFieldDecorator('userId', {
              initialValue: this.state.pageData.id,
              rules: [{
                required: true
              }],
            })(
              <Input disabled={true} placeholder=""/>
            )}
          </FormItem>
          <PrivilegeTransfer
            bindIds={"roleIds"}
            title={"拥有角色"}
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


  resetMenuPrivilege(selectOrgId) {
    console.log("renderMenuPrivilegeTransfer被调用了");


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


        if (hasPId["roleId"] === allPId["id"]) {
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
    console.log("menu 的onChange事件")
    this.setState({
      menuTargetKeys: targetKeys
    });
  }

}

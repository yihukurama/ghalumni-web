import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form, Button, Card, Alert, Input,
} from 'antd';
import {message} from "antd/lib/index";
import SubSystemSelect from "./SubSystemSelect";
import PrivilegeTransfer from "./PrivilegeTransfer";
import {getUrlPar} from "../../../../utils/utils";

const FormItem = Form.Item;

@connect(({user, adminBaseCrud, loading}) => ({
  adminBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.adminBaseCrud,
}))
@Form.create()
export default class SummitPrivilege extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      pageData: props.pageData,
      responseData: {},
      menuMockData: [],      //未选权限
      menuTargetKeys: [],    //需要提交的权限
      funcMockData: [],      //未选权限
      funcTargetKeys: [],    //需要提交的权限
      menuAllPrivileges: [],
      menuHasPrivileges: [],
      funcAllPrivileges: [],
      funcHasPrivileges: [],
      selectSubSystemId: ""

    },
      this.subSystemOnChange = this.subSystemOnChange.bind(this);
    this.selectMenuPrivileges = this.selectMenuPrivileges.bind(this);
    this.selectFuncPrivileges = this.selectFuncPrivileges.bind(this);
  }


  componentDidMount() {

  }

  subSystemOnChange(selectOrgId) {
    console.log("summit的onChange被调用了");
    console.log(selectOrgId);
    this.setState({
      selectSubSystemId: selectOrgId
    });
    this.resetMenuPrivilege(selectOrgId);
    this.resetFuncPrivilege(selectOrgId);
  }


  handleSubmitPrivilege = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {

        this.props.dispatch({
          type: 'adminBaseCrud/add',
          payload: {
            modelName: "Roleprivilege",
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
            label="角色id"
          >
            {getFieldDecorator('roleId', {
              initialValue: this.state.pageData.roleId,
              rules: [{
                required: true
              }],
            })(
              <Input disabled={true} placeholder=""/>
            )}
          </FormItem>
          <SubSystemSelect
            onChange={this.subSystemOnChange}
            form={this.props.form}
          />
          <PrivilegeTransfer
            bindIds={"menuIds"}
            title={"菜单权限"}
            allPrivilege={this.state.menuAllPrivileges}
            hasPrivilege={this.state.menuHasPrivileges}
            mockData={this.state.menuMockData}
            targetKeys={this.state.menuTargetKeys}
            selectPrivileges={this.selectMenuPrivileges}
            form={this.props.form}
          />
          <PrivilegeTransfer
            bindIds={"funcIds"}
            title={"功能权限"}
            allPrivilege={this.state.funcAllPrivileges}
            hasPrivilege={this.state.funcHasPrivileges}
            mockData={this.state.funcMockData}
            targetKeys={this.state.funcTargetKeys}
            selectPrivileges={this.selectFuncPrivileges}
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

  resetFuncPrivilege(selectOrgId) {
    console.log("renderMenuPrivilegeTransfer被调用了");
    const {dispatch} = this.props;
    //获取所有权限
    dispatch({
      type: 'adminBaseCrud/fetch',
      payload: {
        modelName: "Func",
        params: {
          subSystemId: selectOrgId
        }
      }, callback: (response) => {
        if (response.success) {
          console.log("给所有权限赋值");
          //给所有权限赋值
          this.setState({
            funcAllPrivileges: response.data
          });
          //获取已有权限
          dispatch({
            type: 'adminBaseCrud/fetch',
            payload: {
              modelName: "Roleprivilege",
              params: {
                roleId: this.state.pageData.roleId,
                type: 4
              }
            }, callback: (response) => {
              if (response.success) {
                //给所有权限赋值
                this.setState({
                  funcHasPrivileges: response.data
                });
                this.getFuncMock(response.data);
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


  }

  resetMenuPrivilege(selectOrgId) {
    console.log("renderMenuPrivilegeTransfer被调用了");
    const {dispatch} = this.props;
    //获取所有权限
    dispatch({
      type: 'adminBaseCrud/fetch',
      payload: {
        modelName: "Menu",
        params: {
          subSystemId: selectOrgId
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
              modelName: "Roleprivilege",
              params: {
                roleId: this.state.pageData.roleId,
                type: 3
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


        if (hasPId["privilegeId"] === allPId["id"]) {
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

  getFuncMock() {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < this.state.funcAllPrivileges.length; i++) {
      if (!this.state.funcAllPrivileges[i].id) {
        continue;
      }
      let data = {
        key: this.state.funcAllPrivileges[i].id,
        title: this.state.funcAllPrivileges[i].text,
        description: `description of content${i + 1}`,
        chosen: false,
      };

      let has = true;
      for (let j = 0; j < this.state.funcHasPrivileges.length; j++) {
        let allPId = this.state.funcAllPrivileges[i];
        let hasPId = this.state.funcHasPrivileges[j];


        if (hasPId["privilegeId"] == allPId["id"]) {
          data.chosen = true;
          targetKeys.push(data.key);
        } else {
          has = false;
        }


      }

      mockData.push(data);


    }
    this.setState({
      funcMockData: mockData,
      funcTargetKeys: targetKeys
    });
  }


  selectFuncPrivileges(targetKeys) {
    this.setState({
      funcTargetKeys: targetKeys
    });
  }
}

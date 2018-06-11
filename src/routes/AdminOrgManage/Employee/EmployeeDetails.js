import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form, Card,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {getUrlPar} from "../../../utils/utils";
import EditEmployee from "./Detail/EditEmployee";
import EmployeeAccount from "./Detail/EmployeeAccount";
import EmpServiceBranch from "./Detail/EmpServiceBranch";

const FormItem = Form.Item;

@connect(({user, adminBaseCrud, loading}) => ({
  adminBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.adminBaseCrud,
}))
@Form.create()
export default class RoleDetails extends PureComponent {

  constructor() {
    super();
    const urlPar = getUrlPar();
    this.state = {
      pageData: {id: urlPar.id},
      responseData: {},
      key: 'employeeDetail',
      noTitleKey: 'employeeDetail',
    }
  }

  onTabChange = (key, type) => {
    this.setState({[type]: key});
  }


  componentDidMount() {


  }


  render() {

    const tabListNoTitle = [{
      key: 'employeeDetail',
      tab: '编辑员工',
    }, {
      key: 'employeeAccount',
      tab: '关联账号',
    }, {
      key: 'employeeServiceBranch',
      tab: '配置网点',
    }];

    const contentListNoTitle = {
      employeeDetail:
        <EditEmployee
          pageData={this.state.pageData}
          responseData={this.state.responseData}
        />,
      employeeAccount:
        <EmployeeAccount
          responseData={this.state.responseData}
          pageData={this.state.pageData}
        />,
      employeeServiceBranch:
        <EmpServiceBranch
          responseData={this.state.responseData}
          pageData={this.state.pageData}
        />
    };


    return (
      <PageHeaderLayout title="员工详情" content="编辑员工，给员工配置账号">
        <div>
          <Card
            style={{width: '100%'}}
            tabList={tabListNoTitle}
            activeTabKey={this.state.noTitleKey}
            onTabChange={(key) => {
              this.onTabChange(key, 'noTitleKey');
            }}
          >
            {contentListNoTitle[this.state.noTitleKey]}
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}

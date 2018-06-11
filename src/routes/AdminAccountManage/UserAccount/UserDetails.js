import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, Divider,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {getUrlPar} from "../../../utils/utils";
import EditUser from "./Detail/EditUser";
import SummitRole from "./Detail/SummitRole";
import {message} from "antd/lib/index";

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
export default class UserDetails extends PureComponent {

  constructor() {
    super();
    const urlPar = getUrlPar();
    this.state = {
      pageData: {id: urlPar.id},
      responseData: {},
      key: 'userDetail',
      noTitleKey: 'userDetail',
    }

  }

  onTabChange = (key, type) => {
    this.setState({[type]: key});
  }


  componentDidMount() {
    console.log("RoleDetailsDidMount====>");


  }


  render() {

    const tabListNoTitle = [{
      key: 'userDetail',
      tab: '编辑用户',
    }, {
      key: 'userRole',
      tab: '用户角色',
    }];

    const contentListNoTitle = {
      userDetail:
        <EditUser
          pageData={this.state.pageData}
          responseData={this.state.responseData}
        />,
      userRole:
        <SummitRole
          pageData={this.state.pageData}
        />,

    };


    return (
      <PageHeaderLayout title="用户详情" content="编辑系统用户信息，用户关联的员工信息，配置用户角色">
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

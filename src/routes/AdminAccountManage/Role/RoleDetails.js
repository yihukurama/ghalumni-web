import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, Divider,
} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {message} from "antd/lib/index";
import PrivilegeTransfer from "./Detail/PrivilegeTransfer";
import OrgSelect from "./Detail/OrgSelect";
import SubSystemList from "../../AdminDevConfig/SubSystem/SubSystemList";
import SubSystemSelect from "./Detail/SubSystemSelect";
import EditRole from "./Detail/EditRole";
import SummitPrivilege from "./Detail/SummitPrivilege";
import {getUrlPar} from "../../../utils/utils";

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
export default class RoleDetails extends PureComponent {

  constructor() {
    super();
    const urlPar = getUrlPar();
    this.state = {
      pageData: {roleId: urlPar.id},
      responseData: {},
      key: 'roleDetail',
      noTitleKey: 'roleDetail',
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
      key: 'roleDetail',
      tab: '编辑角色',
    }, {
      key: 'rolePrivilege',
      tab: '修改权限',
    }];

    const contentListNoTitle = {
      roleDetail:
        <EditRole
          pageData={this.state.pageData}
          responseData={this.state.responseData}
        />,
      rolePrivilege:
        <SummitPrivilege
          pageData={this.state.pageData}
        />
    };


    return (
      <PageHeaderLayout title="角色详情" content="编辑角色，给角色配置菜单及功能权限">
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

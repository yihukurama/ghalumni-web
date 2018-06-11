import React from 'react';
import {connect} from 'dva';
import {
  Transfer,
  Form
} from 'antd';


const FormItem = Form.Item;


@connect(({user, adminBaseCrud, loading}) => ({
  adminBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.adminBaseCrud,
}))
@Form.create()
export default class PrivilegeTransfer extends Transfer {

  constructor(props) {
    super(props);
    this.state = {
      selectOrgId: props.selectOrgId,
      form: props.form,
      mockData: [],      //未选权限
      targetKeys: [],    //需要提交的权限
      allPrivilege: props.allPrivilege,   //所有权限
      hasPrivilege: props.hasPrivilege,   //已有权限
      modelName: props.modelName,  //菜单或功能
      type: props.type,  //菜单或者功能
      rowKeys: [],
      data: [],
    };
  }


  componentDidMount() {
    console.log("transfer的didmount被调用了");

  }


  render() {
    const {form, title, selectPrivileges} = this.props;

    return (
      <FormItem label={title}>
        {form.getFieldDecorator(this.props.bindIds, {
          rules: [{
            required: true,
          }], initialValue: ''
        })(
          <Transfer
            dataSource={this.props.mockData}
            showSearch
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            onChange={selectPrivileges}
            render={item => item.title}
          />
        )}

      </FormItem>


    );
  }


  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1;
  }

}



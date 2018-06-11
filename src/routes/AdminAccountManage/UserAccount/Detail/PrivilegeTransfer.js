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



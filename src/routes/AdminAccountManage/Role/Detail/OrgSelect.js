import React from 'react';
import {connect} from 'dva';
import {
  Select,
  Form, TextArea
} from 'antd';


import {message} from "antd/lib/index";
import {getUrlPar} from "../../../../utils/utils";

const FormItem = Form.Item;


@connect(({user, adminBaseCrud, loading}) => ({
  adminBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.adminBaseCrud,
}))
@Form.create()
export default class OrgSelect extends Select {

  constructor(props) {
    super();
    this.state = {
      data: [],
      defData: ""
    };
  }


  componentDidMount() {


    const {dispatch} = this.props;
    dispatch({
      type: 'adminBaseCrud/fetch',
      payload: {
        modelName: "Organization",
      }, callback: (response) => {
        if (response.success) {
          this.setState({
            data: response.data,
          });
          if (this.props.updateData.orgId) {
            for (var d in response.data) {
              if (response.data[d].id == this.props.updateData.orgId) {
                this.setState({
                  defData: response.data[d]["text"]
                });
                break;
              }
            }
          }


        } else {

          message.success('未能获取查询条件');
        }

      },
    });

  }


  render() {

    //formData表示空间的一些属性及数据，nowData表示已经存在的数据
    const {form, formItemLayout, updateData} = this.props;
    return (

      <FormItem label="所属机构" {...formItemLayout}>

        {form.getFieldDecorator("orgId", {
          rules: [{
            required: true,
          }], initialValue: this.state.defData
        })(
          <Select
            showSearch
            style={{width: 200}}
            placeholder="请选择"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >

            {this.state.data.map((stateData) =>
              <Select.Option key={stateData.id}>{stateData["text"]}</Select.Option>)}
          </Select>
        )}

      </FormItem>

    );
  }

}



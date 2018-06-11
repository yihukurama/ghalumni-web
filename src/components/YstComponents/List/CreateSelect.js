import React from 'react';
import {connect} from 'dva';
import {
  Select,
  Form
} from 'antd';


import {message} from "antd/lib/index";
import {getUrlPar} from "../../../utils/utils";

const FormItem = Form.Item;


@connect(({user, adminBaseCrud, loading}) => ({
  adminBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.adminBaseCrud,
}))
@Form.create()
export default class CreateSelect extends Select {

  constructor(props) {
    super();
    this.state = {
      modelName: props.modelName,
      data: []
    };
  }


  componentDidMount() {


    const {dispatch} = this.props;
    dispatch({
      type: 'adminBaseCrud/fetch',
      noSave: true,
      payload: {
        modelName: this.state.modelName,
        params: this.state.params,
      }, callback: (response) => {
        if (response.success) {
          this.setState({
            data: response.data
          });

        } else {

          message.success('未能获取查询条件');
        }

      },
    });

  }


  render() {

    const {form, data, updateData} = this.props;
    const urlPar = getUrlPar();
    return (

      <FormItem label={data.desc}>
        {form.getFieldDecorator(data.relateId, {
          rules: [{
            required: true,
          }],
          initialValue: (updateData ? (updateData[data.key] ? updateData[data.key] : null) : null) || urlPar.code || ''
        })(
          <Select
            showSearch
            style={{width: 200}}
            placeholder="请选择"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >

            {this.state.data.map((stateData) =>
              <Select.Option key={stateData.id}>{stateData[data.key]}</Select.Option>)}
          </Select>
        )}

      </FormItem>

    );
  }

}



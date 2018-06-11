import React from 'react';
import {connect} from 'dva';
import {
  Select,
  Form
} from 'antd';


import {message} from "antd/lib/index";
import {getUrlPar} from "../../../utils/utils";

const FormItem = Form.Item;

@connect(({user, businessBaseCrud, loading}) => ({
  businessBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.businessBaseCrud,
}))
@Form.create()
export default class BCreateMutiSelect extends Select {

  constructor(props) {
    super();
    this.state = {
      models: props.data,
      params: {},
      data: [[], [], [], []],
      defVal: [[], [], [], []]
    }
  }


  componentDidMount() {
    this.getData();
  }

  getData(index = 0, relateId, id) {
    const {dispatch} = this.props;
    const params = this.state.params
    relateId ? params[relateId] = id : '';
    dispatch({
      type: 'businessBaseCrud/fetch',
      noSave: true,
      payload: {
        modelName: this.state.models[index].modelName,
        params: params,
      }, callback: (response) => {
        if (response.success) {
          const data = this.state.data;
          const defVal = this.state.defVal;
          data[index] = response.data;
          defVal[index] = response.data[0].id
          this.setState({
            data: data,
            defVal: defVal
          });
          index++;
          if (this.state.models.length > index) {
            this.getData(index, this.state.models[index - 1].relateId, response.data[0].id)
          }
        } else {
          message.success('未能获取查询条件');
        }
      },
    });
  }


  handleSelect = (value, combo) => {
    const index = combo.props.index + 1;
    if (this.state.models.length > index) {
      this.getData(index, this.state.models[index - 1].relateId, value)
    }
  }

  render() {

    const {form, data, updateData} = this.props;
    return (
      data.map((list, index) =>
        <FormItem style={{flex: 1}} label={list.desc}>
          {form.getFieldDecorator(list.relateId, {
            rules: [{
              required: true,
            }],
            initialValue: (updateData ? (updateData[data.key] ? updateData[data.key] : null) : null) || this.state.defVal[index]
          })(
            <Select
              showSearch
              style={{width: 200}}
              placeholder="请选择"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange={this.handleSelect}
            >
              {this.state.data[index].map((stateData) =>
                <Select.Option index={index} value={stateData.id}
                               title={stateData[list.key]}>{stateData[list.key]}</Select.Option>)}
            </Select>
          )}

        </FormItem>
      )


    );
  }

}



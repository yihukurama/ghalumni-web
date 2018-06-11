import React from 'react';
import {connect} from 'dva';
import {
  Select,
  Form,
} from 'antd';


import {message} from "antd/lib/index";

const FormItem = Form.Item;


@connect(({user, adminBaseCrud, loading}) => ({
  adminBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.adminBaseCrud,
}))
@Form.create()
export default class SubSystemSelect extends Select {

  constructor(props) {
    super();
    this.state = {
      data: [],
      defData: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {


    const {dispatch} = this.props;
    dispatch({
      type: 'adminBaseCrud/fetch',
      payload: {
        modelName: "Subsystem",
      }, callback: (response) => {
        if (response.success) {
          console.log("请求的系统是" + response.data);
          this.setState({
            data: response.data,
            defData: response.data[0]["text"]
          });


        } else {

          message.success('未能获取查询条件');
        }

      },
    });

  }

  handleChange(value) {
    this.props.onChange(value);
  }

  render() {

    const {form} = this.props;

    return (

      <FormItem label="权限所属系统">
        {form.getFieldDecorator("subSystemId", {
          rules: [{
            required: true,
          }], initialValue: this.state.defData
        })(
          <Select
            onChange={this.handleChange}
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



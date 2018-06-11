import React from 'react';
import {connect} from 'dva';
import {
  Select,
  Col,
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
export default class SearchSelect extends Select {

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
        noSave: true,
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

    const {data, getFieldDecorator} = this.props;
    const urlPar = getUrlPar();

    return (
      <Col style={{paddingLeft: 24, paddingRight: 24}} md={8} sm={24}>
        <FormItem label={data.desc}>
          {getFieldDecorator(data.key, {initialValue: urlPar.code || ''})(
            <Select
              showSearch
              style={{width: 200}}
              placeholder="请选择"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >

              {this.state.data.map((data) =>
                <Select.Option key={data.text}>{data.text}</Select.Option>)}


            </Select>
          )}

        </FormItem>

      </Col>
    );
  }

}



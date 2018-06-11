import React from 'react';
import {connect} from 'dva';
import {
  Col,
  Form, Input, InputNumber,
  Modal
} from 'antd';
import CreateSelect from "./CreateSelect";
import CreateMutiSelect from "./CreateMutiSelect";

const FormItem = Form.Item;

@connect(({user, adminBaseCrud, loading}) => ({
  adminBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.adminBaseCrud,
}))
@Form.create()


export default class EditForm extends Form {

  render() {
    const {createConditon, modalVisible, form, handleUpdate, handleUpdateModalVisible, updateData} = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;

        console.log('Received values of form: ', fieldsValue);
        handleUpdate(fieldsValue);
      });
    };

    return (
      <Modal
        title="编辑"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible(false, updateData)}
      >
        {
          createConditon.createData.map(data => {
            if (data.length) {
              if (data[0].type !== 'mutiSelect') {
                return (
                  <Col style={{display: 'flex'}}>
                    {
                      data.map(list => {
                        if (list.type !== 'select') {
                          return (
                            <FormItem style={{flex: 1}} label={list.title}>
                              {form.getFieldDecorator(list.dataIndex, {
                                rules: [{
                                  type: list.type, required: list.required, message: '格式错误:' + list.type,
                                }],
                                initialValue: (updateData ? (updateData[list.dataIndex] ? updateData[list.dataIndex] : null) : null) || ''
                              })(
                                this.renderInput(list)
                              )}
                            </FormItem>
                          )
                        } else {
                          return (
                            <CreateSelect
                              data={list}
                              modelName={list.modelName}
                              form={form}
                              updateData={updateData}
                            />
                          )
                        }
                      })
                    }
                  </Col>
                );
              }
              if (data[0].type === 'mutiSelect') {
                return (
                  <Col style={{display: 'flex'}}>
                    <CreateMutiSelect
                      data={data}
                      form={form}
                    />
                  </Col>
                )
              }
            }
          })
        }


      </Modal>
    );

  }

  renderInput(data) {
    if (data.type == 'number') {
      return (
        <InputNumber placeholder={'请输入' + data.title}/>
      )
    }
    if (data.dataIndex == 'id') {
      return (
        <Input disabled={true} placeholder={'请输入' + data.title}/>
      )

    }
    return (
      <Input placeholder={'请输入' + data.title}/>
    )

  }
}



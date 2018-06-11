import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Icon,
  Input,
  Menu,
  Modal,
  Row,

} from 'antd';
import {routerRedux} from 'dva/router';
import StandardTable from '../../../components/StandardTable/index';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import {getUrlPar, urlParAssign} from '../../../utils/utils';

import styles from './BCommList.less';
import {message} from "antd/lib/index";
import SearchSelect from "./BSearchSelect";
import CreateForm from "./BCreateForm";
import EditForm from "./BEditForm";

const FormItem = Form.Item;
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

const SearchFrom = Form.create()((props) => {
  const {getFieldDecorator} = props;
  const urlPar = getUrlPar();
  return (

    <Col style={{paddingLeft: 24, paddingRight: 24}} md={8} sm={24}>
      <FormItem label={props.data.desc}>
        {getFieldDecorator(props.data.key, {initialValue: urlPar.code || ''})(
          <Input placeholder="请输入"/>
        )}
      </FormItem>
    </Col>
  );
});


@connect(({user, businessBaseCrud, loading}) => ({
  businessBaseCrud,
  currentUser: user.currentUser,
  loading: loading.models.businessBaseCrud,
}))
@Form.create()
export default class BCommList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      editUrl: props.editUrl,
      updateData: {},
      updateModalVisible: false,
      modalVisible: false,
      selectedRows: [],
      formValues: {},
    };
  }


  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'businessBaseCrud/fetch',
      payload: {
        modelName: this.props.modelName,
        page: getUrlPar().current,
        params: {
          ...getUrlPar(),
        }
      },
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const {dispatch} = this.props;
    const {formValues} = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = {...obj};
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    urlParAssign({
      current: pagination.current,
      ...params,
    });

    dispatch({
      type: 'businessBaseCrud/fetch',
      payload: {
        modelName: this.props.modelName,
        params: params,
        page: pagination.current,
      },
    });
  }

  handleFormReset = () => {
    const {form, dispatch} = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });

    urlParAssign({
      current: 1,
    });

    dispatch({
      type: 'businessBaseCrud/fetch',
      payload: {
        modelName: this.props.modelName,
        page: 1,
        params: {},
      },
    });
  }

  handleAdd = (fields) => {

    this.props.dispatch({
      type: 'businessBaseCrud/add',
      payload: {
        modelName: this.props.modelName,
        params: fields

      }, callback: (response) => {
        if (response.success) {
          message.success('新增成功');
        } else {

          message.success('新增失败' + response.msg);
        }
        // this.handleFormReset();
      },
    });


    this.setState({
      modalVisible: false,
    });
  }

  handleModalVisible = (flag) => {

    if (this.props.createConditon.createData.length == 0) {
      message.success('该页面数据不能后台新增');
      return;
    }
    this.setState({
      modalVisible: !!flag,
    });
  }

  handleMenuClick = (e) => {
    const {dispatch} = this.props;
    const {selectedRows} = this.state;
    const {config} = this.props;
    if (!selectedRows) return;

    if (!config.mutiDel && selectedRows.length > 1) {
      message.success('不允许批量删除');
      return;
    }

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'businessBaseCrud/remove',
          payload: {
            modelName: this.props.modelName,
            params: {
              id: selectedRows[0].id,

            }
          },
          callback: (response) => {
            if (response.success) {
              message.success('删除成功');
            } else {

              message.success('删除失败' + response.msg);
            }
            this.handleFormReset();

          },
        });
        break;
      case 'edit':


        if (this.state.editUrl || false) {
          var editUrl = this.state.editUrl
          //editUrl = editUrl.replace('{id}',selectedRows[0].id);
          //跳转编辑详情页
          dispatch(routerRedux.push(editUrl));
          urlParAssign({
            id: selectedRows[0].id,
          });
          break;
        }


        if (this.props.createConditon.createData.length == 0) {
          message.success('该页面数据不能后台编辑');
          return;
        }

        dispatch({
          type: 'businessBaseCrud/fetchDetail',
          payload: {
            modelName: this.props.modelName,
            params: {
              id: selectedRows[0].id,

            }
          },
          callback: (response) => {
            if (response.success) {
              message.success('查询成功');
              this.handleUpdateModalVisible(true, response.data);
            } else {

              message.success('查询失败' + response.msg);
            }

          },
        });
        break;
      default:
        break;
    }
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const {dispatch, form} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      for (var i in fieldsValue) {
        if (fieldsValue[i] === "") {
          fieldsValue[i] = null;
        }
      }

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      message.success('查询' + JSON.stringify(values));
      this.setState({
        formValues: values,
      });

      urlParAssign({
        current: 1,
        ...values,
      });

      dispatch({
        type: 'businessBaseCrud/fetch',
        payload: {
          modelName: this.props.modelName,
          page: 1,
          params: values,
        },
      });
    });
  }


  renderForm(searchCondition) {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{md: 8, lg: 24, xl: 48}}>

          {searchCondition.textSearch.map((data) =>
            <SearchFrom
              key={data.key}
              data={data}
              getFieldDecorator={getFieldDecorator}
            />)}

          {searchCondition.listSearch.map((data) =>
            <SearchSelect
              key={data.key}
              data={data}
              modelName={data.modelName}
              getFieldDecorator={getFieldDecorator}
            />)}


          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderCreateForm(parentMethods, createConditon, modalVisible) {


    return (
      <CreateForm
        {...parentMethods}
        createConditon={createConditon}
        modalVisible={modalVisible}
      />);


  }

  render() {
    const {listTitle, businessBaseCrud: {data, total}, loading, searchCondition, createConditon} = this.props;
    const {selectedRows, modalVisible, updateModalVisible} = this.state;
    const urlPar = getUrlPar();


    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="edit">编辑</Menu.Item>
      </Menu>
    );
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const parentMethodsUpdate = {
      handleUpdate: this.handleUpdate,
      handleUpdateModalVisible: this.handleUpdateModalVisible,
    };

    return (
      <PageHeaderLayout title={listTitle}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm(searchCondition)}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>

                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down"/>
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              total={total}
              pagination={{current: urlPar.current}}
              columns={this.props.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <div>
          {this.renderCreateForm(parentMethods, createConditon, modalVisible)}
        </div>
        <div>
          {this.renderUpdateForm(parentMethodsUpdate, createConditon, updateModalVisible, this.state.updateData)}
        </div>
      </PageHeaderLayout>
    );
  }

  handleUpdate = (fields) => {

    this.props.dispatch({
      type: 'businessBaseCrud/update',
      payload: {
        modelName: this.props.modelName,
        params: fields

      }, callback: (response) => {
        if (response.success) {
          message.success('更新成功');
        } else {

          message.success('更新失败' + response.msg);
        }
      },
    })
    this.setState({
      updateModalVisible: false,
    });
  }
  handleUpdateModalVisible = (flag, data) => {
    this.setState({
      updateData: data,
      updateModalVisible: !!flag,
    });
  }

  renderUpdateForm(parentMethodsUpdate, createConditon, updateModalVisible, updateData) {
    return (
      <EditForm
        {...parentMethodsUpdate}
        createConditon={createConditon}
        modalVisible={updateModalVisible}
        updateData={updateData}
      />);
  }
}

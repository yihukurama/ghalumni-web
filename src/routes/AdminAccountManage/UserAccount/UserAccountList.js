import CommList from '../../../components/YstComponents/List/CommList';
import React from 'react';


//配置查询
const searchCondition = {
  //配置输入查询
  textSearch: [
    {
      key: 'username',
      desc: '账号名',
    }, {
      key: 'employeeName',
      desc: '员工名',
    }],
  //配置列表查询
  listSearch: []


};


const columns = [
  {
    title: '账号名称',
    dataIndex: 'username',

  },
  {
    title: '员工名称',
    dataIndex: 'employeeName',

  },
  {
    title: '备注信息',
    dataIndex: 'note',
  },
  {
    title: '排序',
    dataIndex: 'indexOrder',
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
  }
];
//配置创建条件
const createConditon = {
  //配置创建框
  createData: [
    [{
      relateId: 'orgId',
      modelName: 'Organization',
      key: 'text',
      desc: '所属机构',
      type: 'mutiSelect'
    }, {
      relateId: 'departmentId',
      modelName: 'Department',
      key: 'text',
      desc: '所属部门',
      type: 'mutiSelect'
    }, {
      relateId: 'employeeId',
      modelName: 'Employee',
      key: 'realName',
      desc: '关联员工',
      type: 'mutiSelect'
    },
    ],
    [{
      title: 'id',
      dataIndex: 'id',
      type: 'string'
    }],
    [{
      title: '账号名',
      dataIndex: 'username',
      type: 'string',
      required: true
    },
      {
        title: '登录密码',
        dataIndex: 'password',
        type: 'string',
        required: true

      }],
    [{
      title: '备注信息',
      dataIndex: 'note',
      type: 'string',
      required: false
    }],
    [{
      title: '排序',
      dataIndex: 'indexOrder',
      type: 'number',
      required: false
    }],


  ],
  //配置关联列创建
  listCreate: [],

};
const config = {
  mutiDel: false,      //是否允许批量删除
  defaultCreateForm: true,    //是否是默认的创建
};
export default class OrgList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <CommList
        listTitle={'账号管理'}
        modelName={'User'}
        searchCondition={searchCondition}
        createConditon={createConditon}
        columns={columns}
        config={config}
        editUrl={"userDetail"}
      />
    );
  }
}

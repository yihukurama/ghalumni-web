import CommList from '../../../components/YstComponents/List/CommList';
import React from 'react';


//配置查询
const searchCondition = {
  //配置输入查询
  textSearch: [{
    key: 'realName',
    desc: '员工名称',
  }],
  //配置列表查询
  listSearch: [{
    modelName: 'Organization',
    key: 'orgName',
    desc: '所属机构',
  },
    {
      modelName: 'Department',
      key: 'depName',
      desc: '所属部门',
    }]


};


const columns = [
  {
    title: '员工名称',
    dataIndex: 'realName',

  },
  {
    title: '员工编码',
    dataIndex: 'code',

  },
  {
    title: '所属机构',
    dataIndex: 'orgName',

  },
  {
    title: '所属部门',
    dataIndex: 'orgDepartment',

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
      title: '员工id',
      dataIndex: 'id',
      type: 'string'
    }],
    [{
      relateId: 'orgId',
      modelName: 'Organization',
      key: 'text',
      type: 'mutiSelect',
      desc: '所属机构',
    }, {
      relateId: 'departmentId',
      modelName: 'Department',
      key: 'text',
      type: 'mutiSelect',
      desc: '所属部门',
    }],
    [
      {
        title: '员工名称',
        dataIndex: 'realName',
        type: 'string',
        required: true
      },
      {
        title: '员工编码',
        dataIndex: 'code',
        type: 'string',
        required: true

      },
    ],
    [
      {
        title: '备注信息',
        dataIndex: 'note',
        type: 'string',
        required: false
      },
    ],
    [
      {
        title: '排序',
        dataIndex: 'indexOrder',
        type: 'number',
        required: false
      }
    ]
  ],


};
const config = {
  mutiDel: false,      //是否允许批量删除
  defaultCreateForm: false,    //是否是默认的创建
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
        listTitle={'员工管理'}
        modelName={'Employee'}
        searchCondition={searchCondition}
        createConditon={createConditon}
        columns={columns}
        config={config}
        editUrl={"employeeDetail"}
      />
    );
  }
}

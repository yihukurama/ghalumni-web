import CommList from '../../../components/YstComponents/List/CommList';
import React from 'react';


//配置查询
const searchCondition = {
  //配置输入查询
  textSearch: [{
    key: 'text',
    desc: '网点名称',
  }],
  //配置列表查询
  listSearch: []


};


const columns = [
  {
    title: '网点名称',
    dataIndex: 'text',

  },
  {
    title: '网点编码',
    dataIndex: 'code',

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
      title: '网点id',
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
        title: '网点id',
        dataIndex: 'id',
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
        title: '网点名称',
        dataIndex: 'text',
        type: 'string',
        required: true
      },
      {
        title: '网点编码',
        dataIndex: 'code',
        type: 'string',
        required: true
      }
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
        listTitle={'网点管理'}
        modelName={'Servicebranch'}
        searchCondition={searchCondition}
        createConditon={createConditon}
        columns={columns}
        config={config}
      />
    );
  }
}

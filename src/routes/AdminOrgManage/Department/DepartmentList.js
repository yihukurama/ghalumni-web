import CommList from '../../../components/YstComponents/List/CommList';
import React from 'react';


//配置查询
const searchCondition = {
  //配置输入查询
  textSearch: [{
    key: 'text',
    desc: '部门名称',
  }],
  //配置列表查询
  listSearch: [{
    modelName: 'Organization',
    key: 'orgName',
    desc: '所属机构',
  }]


};


const columns = [
  {
    title: '部门名称',
    dataIndex: 'text',

  },
  {
    title: '部门编码',
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
      relateId: 'orgId',
      modelName: 'Organization',
      key: 'text',
      type: 'select',
      desc: '所属机构',
    }],
    [
      {
        title: '部门名称',
        dataIndex: 'text',
        type: 'string',
        required: true
      },
      {
        title: '部门编码',
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
        listTitle={'部门管理'}
        modelName={'Department'}
        searchCondition={searchCondition}
        createConditon={createConditon}
        columns={columns}
        config={config}
      />
    );
  }
}

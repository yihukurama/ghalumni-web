import CommList from '../../../components/YstComponents/List/CommList';
import React from 'react';

//配置查询
const searchCondition = {
  //配置输入查询
  textSearch: [{
    key: 'text',
    desc: '菜单名称',
  }],
  //配置列表查询
  listSearch: [{
    modelName: 'Subsystem',
    key: 'subSystemName',
    desc: '所属系统',
  }]


};


const columns = [
  {
    title: '菜单名称',
    dataIndex: 'text',
  },
  {
    title: '所属系统',
    dataIndex: 'subSystemName',
  },
  {
    title: '菜单编码',
    dataIndex: 'code',

  },
  {
    title: '菜单路径',
    dataIndex: 'linkUrl',

  },
  {
    title: '备注信息',
    dataIndex: 'note',
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
  },
  {
    title: '更新时间',
    dataIndex: 'operateDate',
  }
];
//配置创建条件
const createConditon = {
  //配置创建框
  createData: [
    [{
      relateId: 'subSystemId',
      modelName: 'Subsystem',
      key: 'text',
      type: 'select',
      desc: '所属系统',
    }],
    [{
      title: '菜单id',
      dataIndex: 'id',
      type: 'string'
    }],
    [{
      title: '菜单名称',
      dataIndex: 'text',
      type: 'string',
      required: true
    },
      {
        title: '菜单编码',
        dataIndex: 'code',
        type: 'string',
        required: true
      }],
    [{
      title: '菜单链接',
      dataIndex: 'linkUrl',
      type: 'string',
      required: false
    }],

    [{
      title: '备注信息',
      dataIndex: 'note',
      type: 'string',
      required: false
    }], [{
      title: '排序',
      dataIndex: 'indexOrder',
      type: 'number',
      required: false
    }],

  ],


};
const config = {
  mutiDel: false,      //是否允许批量删除
  defaultCreateForm: true,    //是否是默认的创建
};
export default class MenueList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <CommList
        listTitle={'系统菜单管理'}
        modelName={'Menu'}
        searchCondition={searchCondition}
        createConditon={createConditon}
        columns={columns}
        config={config}
      />
    );
  }
}

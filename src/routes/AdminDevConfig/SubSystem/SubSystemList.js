import React from 'react';
import CommList from '../../../components/YstComponents/List/CommList';
//配置查询
const searchCondition = {
  //配置输入查询
  textSearch: [{
    key: 'text',
    desc: '系统名称',
  }],
  //配置列表查询
  listSearch: []


};
//配置列表字段
const columns = [
  {
    title: '系统名称',
    dataIndex: 'text',
  },
  {
    title: '系统编码',
    dataIndex: 'code',

  },
  {
    title: '排序',
    dataIndex: 'indexOrder',

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
      title: '系统id',
      dataIndex: 'id',
      type: 'string'
    }],
    [{
      title: '系统名称',
      dataIndex: 'text',
      type: 'string',
      required: true
    },
      {
        title: '系统编码',
        dataIndex: 'code',
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


};

const config = {
  mutiDel: false,      //是否允许批量删除
  defaultCreateForm: true,    //是否是默认的创建
  defaultEditForm: true,    //是否是默认的编辑
};
export default class SubSystemList extends React.Component {

  render() {

    return (
      <CommList
        listTitle={'平台子管理'}
        modelName={'Subsystem'}
        searchCondition={searchCondition}
        createConditon={createConditon}
        columns={columns}
        config={config}
      />
    );
  }
}

import CommList from '../../../components/YstComponents/List/CommList';
import React from 'react';


//配置查询
const searchCondition = {
  //配置输入查询
  textSearch: [{
    key: 'text',
    desc: '配置名称',
  }],
  //配置列表查询
  listSearch: []


};


const columns = [
  {
    title: '配置编码',
    dataIndex: 'code',

  },
  {
    title: '配置值',
    dataIndex: 'value',

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
      title: '配置id',
      dataIndex: 'id',
      type: 'string'
    }],
    [{
      title: '配置编码',
      dataIndex: 'code',
      type: 'string',
      required: true
    },
      {
        title: '配置值',
        dataIndex: 'value',
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
    }]

  ],
  //配置关联列创建
  listCreate: [],

};
const config = {
  mutiDel: false,      //是否允许批量删除
  defaultCreateForm: true,    //是否是默认的创建
};
export default class ConfigList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <CommList
        listTitle={'系统配置管理'}
        modelName={'Configuration'}
        searchCondition={searchCondition}
        createConditon={createConditon}
        columns={columns}
        config={config}
      />
    );
  }
}

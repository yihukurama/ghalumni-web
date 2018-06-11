import CommList from '../../../components/YstComponents/List/CommList';
import React from 'react';


//配置查询
const searchCondition = {
  //配置输入查询
  textSearch: [{
    key: 'text',
    desc: '功能名称',
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
    title: '功能名称',
    dataIndex: 'text',
  },
  {
    title: '所属系统',
    dataIndex: 'subSystemName',
  },
  {
    title: '功能编码',
    dataIndex: 'code',

  },
  {
    title: '功能路径',
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
      desc: '所属系统',
      type: 'select'
    }],
    [{
      title: '功能id',
      dataIndex: 'id',
      type: 'string'
    }],
    [{
      title: '功能名称',
      dataIndex: 'text',
      type: 'string',
      required: true
    },
      {
        title: '功能编码',
        dataIndex: 'code',
        type: 'string',
        required: true
      }],
    [{
      title: '功能链接',
      dataIndex: 'linkUrl',
      type: 'string',
      required: false
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
export default class FuncList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <CommList
        listTitle={'系统功能管理'}
        modelName={'Func'}
        searchCondition={searchCondition}
        createConditon={createConditon}
        columns={columns}
        config={config}
      />
    );
  }
}

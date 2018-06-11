import CommList from '../../../components/YstComponents/List/CommList';
import React from 'react';


//配置查询
const searchCondition = {
  //配置输入查询
  textSearch: [{
    key: 'type',
    desc: '模板编码',
  }],
  //配置列表查询
  listSearch: []


};


const columns = [
  {
    title: '模板编码',
    dataIndex: 'type',

  },
  {
    title: '模板标题',
    dataIndex: 'text',

  },
  {
    title: '模板内容',
    dataIndex: 'content',
  },
  {
    title: '备注',
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
      title: '模板id',
      dataIndex: 'id',
      type: 'string'
    }],
    [{
      title: '模板编码',
      dataIndex: 'type',
      type: 'string',
      required: true
    },
      {
        title: '模板标题',
        dataIndex: 'text',
        type: 'string',
        required: true
      }],
    [{
      title: '备注',
      dataIndex: 'note',
      type: 'string',
      required: false
    }],
    [{
      title: '模板内容',
      dataIndex: 'content',
      type: 'string',
      required: true
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
        listTitle={'短信模板管理'}
        modelName={'Smstemplate'}
        searchCondition={searchCondition}
        createConditon={createConditon}
        columns={columns}
        config={config}
      />
    );
  }
}

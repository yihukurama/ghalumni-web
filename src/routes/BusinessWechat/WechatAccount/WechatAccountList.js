import React from 'react';
import BCommList from "../../../components/YstComponents/businessList/BCommList";
import {Avatar} from "antd";


//配置查询
const searchCondition = {
  //配置输入查询
  textSearch: [
    {
      key: 'nickName',
      desc: '昵称',
    }],
  //配置列表查询
  listSearch: []


};


const columns = [
  {
    title: '微信昵称',
    dataIndex: 'nickName',
    render(val) {
      return decodeURI(val);
    },
  },
  {
    title: '微信头像',
    dataIndex: 'avatarUrl',
    render(val) {
      return <Avatar shape="square" size="large" icon="user" src={val}/>;
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
    render(val) {
      if (val == 1) {
        return "男";
      }
      if (val == 2) {
        return "女";
      }
    },
  },
  {
    title: '国家',
    dataIndex: 'country',
  },
  {
    title: '省份',
    dataIndex: 'province',
  },
  {
    title: '城市',
    dataIndex: 'city',
  },
  {
    title: '微信openId',
    dataIndex: 'perOpenId',
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
  }
];
//配置创建条件
const createConditon = {
  //配置创建框
  createData: [],
  //配置关联列创建
  listCreate: [],

};
const config = {
  mutiDel: false,      //是否允许批量删除
  defaultCreateForm: true,    //是否是默认的创建
};
export default class WechatAccountList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <BCommList
        listTitle={'微信账号管理'}
        modelName={'Wxuser'}
        searchCondition={searchCondition}
        createConditon={createConditon}
        columns={columns}
        config={config}
        editUrl={"WechatAccountDetail"}
      />
    );
  }
}

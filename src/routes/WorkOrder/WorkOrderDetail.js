import React, {Component, Fragment} from 'react';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import {connect} from 'dva';
import {
  Input,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Dropdown,
  Icon,
  Menu,
  Popover,
  Row,
  Steps,
  Table,
  Tooltip
} from 'antd';
import classNames from 'classnames';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import DescriptionList from '../../components/DescriptionList';
import styles from './WorkOrderDetail.less';

import {getUrlPar} from '../../utils/utils';

const {Step} = Steps;
const {Description} = DescriptionList;
const ButtonGroup = Button.Group;

const getWindowWidth = () => (window.innerWidth || document.documentElement.clientWidth);

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>操作</Button>
      <Button>操作</Button>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button><Icon type="ellipsis"/></Button>
      </Dropdown>
    </ButtonGroup>
    <Button type="primary">主操作</Button>
  </Fragment>
);

const extra = (
  <Row>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>状态</div>
      <div className={styles.heading}>待审批</div>
    </Col>
    <Col xs={24} sm={12}>
      <div className={styles.textSecondary}>订单金额</div>
      <div className={styles.heading}>¥ 568.08</div>
    </Col>
  </Row>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="创建人">曲丽丽</Description>
    <Description term="订购产品">XX 服务</Description>
    <Description term="创建时间">2017-07-07</Description>
    <Description term="关联单据"><a href="">12421</a></Description>
    <Description term="生效日期">2017-07-07 ~ 2017-08-08</Description>
    <Description term="备注">请于两个工作日内确认</Description>
  </DescriptionList>
);

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      曲丽丽
      <Icon type="dingding-o" style={{marginLeft: 8}}/>
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      周毛毛
      <Icon type="dingding-o" style={{color: '#00A0E9', marginLeft: 8}}/>
    </Fragment>
    <div><a href="">催一下</a></div>
  </div>
);

const popoverContent = (
  <div style={{width: 160}}>
    吴加号
    <span className={styles.textSecondary} style={{float: 'right'}}>
      <Badge status="default" text={<span style={{color: 'rgba(0, 0, 0, 0.45)'}}>未响应</span>}/>
    </span>
    <div className={styles.textSecondary} style={{marginTop: 4}}>耗时：2小时25分钟</div>
  </div>
);

const customDot = (dot, {status}) => (status === 'process' ? (
  <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
    {dot}
  </Popover>
) : dot);

const operationTabList = [{
  key: 'tab1',
  tab: '换件项目',
}, {
  key: 'tab2',
  tab: '修理项目',
}];

const columns = [{
  title: '项目名称',
  dataIndex: 'itemText',
  key: 'itemText',
  render: (text, record) => this.renderColumns(text, record, 'itemText'),
}, {
  title: '数量',
  dataIndex: 'number',
  key: 'number',
  render: (text, record) => this.renderColumns(text, record, 'number'),
}, {
  title: '价格',
  dataIndex: 'itemPrice',
  key: 'itemPrice',
  render: (text, record) => this.renderColumns(text, record, 'itemPrice'),
}, {
  title: '备注',
  dataIndex: 'note',
  render: (text, record) => this.renderColumns(text, record, 'note'),
}];

const EditableCell = ({editable, value, onChange}) => (
  <div>
    {editable
      ? <Input style={{margin: '-5px 0'}} value={value} onChange={e => onChange(e.target.value)}/>
      : value
    }
  </div>
);

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '项目名称',
      dataIndex: 'itemText',
      key: 'itemText',
      render: (text, record) => this.renderColumns(text, record, 'itemText'),
    }, {
      title: '数量',
      dataIndex: 'number',
      key: 'number',
      render: (text, record) => this.renderColumns(text, record, 'number'),
    }, {
      title: '价格',
      dataIndex: 'itemPrice',
      key: 'itemPrice',
      render: (text, record) => this.renderColumns(text, record, 'itemPrice'),
    }, {
      title: '备注',
      dataIndex: 'note',
      render: (text, record) => this.renderColumns(text, record, 'note'),
    }];
    this.state = {data};
    this.cacheData = data.map(item => ({...item}));
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({data: newData});
    }
  }

  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({data: newData});
    }
  }

  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({data: newData});
      this.cacheData = newData.map(item => ({...item}));
    }
  }

  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({data: newData});
    }
  }

  render() {
    return <Table bordered dataSource={this.state.data} columns={this.columns}/>;
  }
}

@connect(({workOrder, loading}) => ({
  workOrder,
  loading: loading.effects['workOrder/fetchDetail'],
}))

export default class WorkOrderDetail extends Component {
  state = {
    operationkey: 'tab1',
    stepDirection: 'horizontal',
  }

  componentDidMount() {
    const {dispatch} = this.props;
    const params = getUrlPar();
    dispatch({
      type: 'workOrder/fetchDetail',
      payload: {
        params: params
      }
    });

    this.setStepDirection();
    window.addEventListener('resize', this.setStepDirection);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStepDirection);
    this.setStepDirection.cancel();
  }

  onOperationTabChange = (key) => {
    this.setState({operationkey: key});
  }

  @Bind()
  @Debounce(200)
  setStepDirection() {
    const {stepDirection} = this.state;
    const w = getWindowWidth();
    if (stepDirection !== 'vertical' && w <= 576) {
      this.setState({
        stepDirection: 'vertical',
      });
    } else if (stepDirection !== 'horizontal' && w > 576) {
      this.setState({
        stepDirection: 'horizontal',
      });
    }
  }

  render() {
    const {stepDirection} = this.state;
    const {workOrder, loading} = this.props;
    const {detail} = workOrder;
    const {cardamagesChange, cardamagesRepair} = detail;
    const contentList = {
      tab1: <Table
        pagination={false}
        loading={loading}
        dataSource={cardamagesChange}
        columns={columns}
      />,
      tab2: <Table
        pagination={false}
        loading={loading}
        dataSource={cardamagesRepair}
        columns={columns}
      />,
    };

    return (
      <PageHeaderLayout
        title={`单号：${detail.num}`}
        action={action}
        content={description}
        extraContent={extra}
      >
        <Card title="流程进度" style={{marginBottom: 24}} bordered={false}>
          <Steps direction={stepDirection} progressDot={customDot} current={1}>
            <Step title="创建项目" description={desc1}/>
            <Step title="部门初审" description={desc2}/>
            <Step title="财务复核"/>
            <Step title="完成"/>
          </Steps>
        </Card>
        <Card title="用户信息" style={{marginBottom: 24}} bordered={false}>
          <DescriptionList style={{marginBottom: 24}}>
            <Description term="用户姓名">付小小</Description>
            <Description term="会员卡号">32943898021309809423</Description>
            <Description term="身份证">3321944288191034921</Description>
            <Description term="联系方式">18112345678</Description>
            <Description term="联系地址">曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</Description>
          </DescriptionList>
          <DescriptionList style={{marginBottom: 24}} title="信息组">
            <Description term="某某数据">725</Description>
            <Description term="该数据更新时间">2017-08-08</Description>
            <Description>&nbsp;</Description>
            <Description term={
              <span>
                某某数据
                <Tooltip title="数据说明">
                  <Icon style={{color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4}} type="info-circle-o"/>
                </Tooltip>
              </span>
            }
            >
              725
            </Description>
            <Description term="该数据更新时间">2017-08-08</Description>
          </DescriptionList>
          <h4 style={{marginBottom: 16}}>信息组</h4>
          <Card type="inner" title="多层级信息组">
            <DescriptionList size="small" style={{marginBottom: 16}} title="组名称">
              <Description term="负责人">林东东</Description>
              <Description term="角色码">1234567</Description>
              <Description term="所属部门">XX公司 - YY部</Description>
              <Description term="过期时间">2017-08-08</Description>
              <Description term="描述">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</Description>
            </DescriptionList>
            <Divider style={{margin: '16px 0'}}/>
            <DescriptionList size="small" style={{marginBottom: 16}} title="组名称" col="1">
              <Description term="学名">
                Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
              </Description>
            </DescriptionList>
            <Divider style={{margin: '16px 0'}}/>
            <DescriptionList size="small" title="组名称">
              <Description term="负责人">付小小</Description>
              <Description term="角色码">1234568</Description>
            </DescriptionList>
          </Card>
        </Card>
        <Card title="用户近半年来电记录" style={{marginBottom: 24}} bordered={false}>
          <div className={styles.noData}>
            <Icon type="frown-o"/>暂无数据
          </div>
        </Card>
        <Card
          className={styles.tabsCard}
          bordered={false}
          tabList={operationTabList}
          onTabChange={this.onOperationTabChange}
        >
          {contentList[this.state.operationkey]}
        </Card>
      </PageHeaderLayout>
    );
  }
}

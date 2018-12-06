import React from 'react';
import {
    Layout, Breadcrumb, Icon,
} from 'antd';
import ContainerMenu from './menu/index'
const { Header, Content, Sider } = Layout;

class Page extends React.Component {
    static defaultProps = {};
    static propTypes = {};
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {

        };
    }
    componentWillMount() {

    }
    componentDidMount() {}
    componentWillReceiveProps(props) {}
    shouldComponentUpdate(props, state) {
        return true
    }
    componentWillUpdate(props, state) {}
    componentDidUpdate(props, state) {}
    componentWillUnmount() {}
    componentDidCatch(error, info) {}
    render() {
        const {menu}=this.props;
        return  <Layout>
            <Header className="header">
                <div className="logo" />

            </Header>
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <ContainerMenu config={menu}/>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{
                        background: '#fff', padding: 24, margin: 0, minHeight: 280,
                    }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    }
}

export default Page
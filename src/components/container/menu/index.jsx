import React from 'react';
import {
     Menu, Icon,
} from 'antd';
import {Link} from 'react-router-dom'
const { SubMenu } = Menu;

class ContainerMenu extends React.Component {
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
        const {config}=this.props;
        return  <Menu
            mode="inline"
            style={{ height: '100%', borderRight: 0 }}
        >
            {config.map(item=>{
                console.log(item)
                return  <SubMenu key={item.path} title={<span><Icon type="user" />{item.name}</span>}>
                    {item.pages.map(item=>{
                        return <Menu.Item key={item.path}>
                                <Link to={item.path}>{item.name}</Link>
                            </Menu.Item>
                    })}
                </SubMenu>
            })}
        </Menu>
    }
}

export default ContainerMenu
import React from 'react';
class Page extends React.Component {
	static defaultProps = {};
	static propTypes = {};
	constructor(props) {
		super(props);
		// Api.insertActions({}, this);
		this.state = {};
	}
	componentWillMount() {}
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
		return "home"
	}
}

export default Page
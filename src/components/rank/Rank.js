import React from 'react';
import Emoji from './Emoji';

class Rank extends React.Component {
	constructor() {
		super();
		this.state = {
			rank: ''
		}
	}

	componentDidMount() {
		this.geradorEmoji(this.props.postagens);
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.postagens === this.props.postagens && prevProps.nome === this.props.nome) {
			return null;
		}
		this.geradorEmoji(this.props.postagens);
	}

	geradorEmoji = (postagens) => {
		const emojis = ['😏','😲','😱','😆','😃','😂','😅','😵','😍','🚀'];
		const rankEmoji = emojis[postagens >= emojis.length ? emojis.length - 1 : postagens];
		this.setState({ rank: rankEmoji });
	}

	render() {
		return (
			<React.Fragment>
				<div className='white f3'>
					{`${this.props.nome} , você ja postou...`}
				</div>
				<div className='white f1'>
					{`${this.props.postagens} fotos.`}
				</div>
				<Emoji symbol={this.state.rank}/>
			</React.Fragment>
		);
	}
}

export default Rank;
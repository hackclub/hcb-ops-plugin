import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { getKey, setKey } from '../app/helpers/g-verify-auth';
import options from '../app/helpers/options';

// this css file isn't working due to CSP
// import "./popup.css";

class Popup extends React.Component<
	{},
	{
		authKey: string;
		bankAutoVerifyGoogleWorkspace: boolean;
		svbBillPayAddIndivHaveBank: boolean;
		svbBillPayAddPayeeActivationCode: boolean;
	}
> {
	constructor(props) {
		super(props);
		this.state = {
			authKey: '',
			bankAutoVerifyGoogleWorkspace: false,
			svbBillPayAddIndivHaveBank: false,
			svbBillPayAddPayeeActivationCode: false,
		};

		getKey().then((value) =>
			this.state.authKey !== value ? this.setState({ authKey: value }) : null
		);

		options.bankAutoVerifyGoogleWorkspace.get().then((value) => {
			const key = 'bankAutoVerifyGoogleWorkspace';
			this.state[key] !== value ? this.setState({ [key]: value }) : null;
		});

		options.svbBillPayAddIndivHaveBank.get().then((value) => {
			const key = 'svbBillPayAddIndivHaveBank';
			this.state[key] !== value ? this.setState({ [key]: value }) : null;
		});

		options.svbBillPayAddPayeeActivationCode.get().then((value) => {
			const key = 'svbBillPayAddPayeeActivationCode';
			this.state[key] !== value ? this.setState({ [key]: value }) : null;
		});
	}

	render() {
		return (
			<div className='popup-padded'>
				<h1 className='heading'>HCB Ops Plugin</h1>

				<h2>Options</h2>
				<div>
					<h3>Bank: Auto Verify Google Workspace</h3>
					<label style={{ paddingRight: '0.5em' }}>
						Automatically attempt to verify domains when you visit the Google
						Workspace page:
					</label>
					<input
						onChange={(e) => {
							const value = e.target.checked;
							this.setState({ bankAutoVerifyGoogleWorkspace: value });
							options.bankAutoVerifyGoogleWorkspace.set(value);
						}}
						checked={this.state.bankAutoVerifyGoogleWorkspace || false}
						type='checkbox'
					></input>
				</div>
				<div>
					<h3>SVB: Auto Choose I have Bank Info</h3>
					<label style={{ paddingRight: '0.5em' }}>
						Automatically select "I have the bank account information" when
						creating a new individual payee:
					</label>
					<input
						onChange={(e) => {
							const value = e.target.checked;
							this.setState({ svbBillPayAddIndivHaveBank: value });
							options.svbBillPayAddIndivHaveBank.set(value);
						}}
						checked={this.state.svbBillPayAddIndivHaveBank || false}
						type='checkbox'
					></input>
				</div>
				<div>
					<h3>SVB: Auto Request Mobile Activation Code</h3>
					<span>{this.state.svbBillPayAddPayeeActivationCode}</span>
					<label style={{ paddingRight: '0.5em' }}>
						Automatically request activation code to be sent to mobile when
						verifying a payee:
					</label>
					<input
						onChange={(e) => {
							const value = e.target.checked;
							this.setState({ svbBillPayAddPayeeActivationCode: value });
							options.svbBillPayAddPayeeActivationCode.set(value);
						}}
						checked={this.state.svbBillPayAddPayeeActivationCode || false}
						type='checkbox'
					></input>
				</div>

				<hr />
				<h2>Set Up</h2>
				<div>
					<h3>G-Verify</h3>
					<label style={{ paddingRight: '0.5em' }}>Authentication Key:</label>
					<input
						onChange={(e) => {
							const newKey = e.target.value;
							this.setState({ authKey: newKey });
							setKey(newKey);
						}}
						value={this.state.authKey}
						size={15}
					></input>
				</div>
				<hr />
				<p>Hows it's going? 🦕</p>
			</div>
		);
	}
}

// --------------

ReactDOM.render(<Popup />, document.getElementById('root'));

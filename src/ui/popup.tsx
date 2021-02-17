import * as React from "react";
import * as ReactDOM from "react-dom";

import { getKey, setKey } from "../app/helpers/g-verify-auth";

// this css file isn't working due to CSP
// import "./popup.css";

class Popup extends React.Component<{}, { authKey: string }> {
	constructor(props) {
		super(props);
		this.state = { authKey: "" };

		getKey().then((value) =>
			this.state.authKey !== value ? this.setState({ authKey: value }) : null
		);
	}

	render() {
		return (
			<div className="popup-padded">
				<h1 className="heading">HCB Ops Plugin</h1>

				<div>
					<h3>G-Verify</h3>
					<label style={{ paddingRight: "0.5em" }}>Authentication Key:</label>
					<input
						name="g-verify-auth-key"
						id="g-verify-auth-key"
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

ReactDOM.render(<Popup />, document.getElementById("root"));

import { useState } from "react";
import { Terminal } from "./terminal";
import { BsTerminalFill } from "react-icons/bs";
import { FaUbuntu } from "react-icons/fa";

import "./home.page.css";

export const HomePage = () => {
	const [visible, setVisible] = useState(true);
	return (
		<div className="home-page">
			{visible && <Terminal onMinimize={() => setVisible(false)} /> }
			{
				!visible && (
					<div className="os-main">
						<iframe width={"100%"} height={"100%"} src="http://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&enablejsapi=1" allow="autoplay"></iframe>	
					</div>
				)
			}
		</div>
	);
};

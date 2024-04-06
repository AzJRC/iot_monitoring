import React, { Children, useState } from "react";
import './window.css';

const Window = ({ children, isWindowClosed  }) => {

  const [isWindowClosedState, setIsWindowClosedState] = useState(false);

    const handleCloseWindow = () => {
        setIsWindowClosedState(true);
        isWindowClosed();
    };

	return (
		<section className="windowContainer">
			<section className="window">
        {children}
        <button onClick={handleCloseWindow}>Close</button>
      </section>
		</section>
	);
};

export default Window;

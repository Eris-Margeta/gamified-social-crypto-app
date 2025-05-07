import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/App.tsx";

import "@/styles/globals.css";
import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("hero-inject")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

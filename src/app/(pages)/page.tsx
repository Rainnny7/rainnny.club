import Greeting from "@/components/landing/greeting";
import Navbar from "@/components/landing/navbar";
import { ReactElement } from "react";

const LandingPage = (): ReactElement => (
	<main
		className="h-screen flex flex-col"
		style={{
			background:
				"linear-gradient(to top, hsla(240, 8%, 8%, 0.5), hsl(var(--background)))",
		}}
	>
		<Navbar />
		<div className="h-full flex flex-col justify-center">
			<Greeting />
		</div>
	</main>
);
export default LandingPage;

import Navbar from "@/components/landing/navbar";
import { ReactElement } from "react";

const LandingPage = (): ReactElement => (
	<main className="flex flex-col">
		<Navbar />
		Page Content
	</main>
);
export default LandingPage;

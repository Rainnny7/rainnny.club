import Greeting from "@/components/landing/greeting";
import Navbar from "@/components/landing/navbar";
import { ReactElement } from "react";

const LandingPage = (): ReactElement => (
    <main className="h-screen flex flex-col">
        <Navbar />
        <div
            className="h-full px-5 xs:px-7 flex flex-col justify-center"
            style={{
                background:
                    "linear-gradient(to top, hsla(240, 8%, 8%, 0.7), hsl(var(--background)))",
            }}
        >
            <Greeting />
        </div>
    </main>
);
export default LandingPage;

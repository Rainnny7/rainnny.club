import Greeting from "@/components/landing/greeting";
import Navbar from "@/components/landing/navbar";
import { ReactElement } from "react";
import Navigation from "@/components/landing/navigation";
import BlurFade from "@/components/ui/blur-fade";
import DiscordStatus from "@/components/landing/discord-status";

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
            <BlurFade className="my-7" delay={1.25} inView>
                <Navigation />
            </BlurFade>
            <BlurFade className="my-7" delay={1.85} inView>
                <DiscordStatus />
            </BlurFade>
        </div>
    </main>
);
export default LandingPage;

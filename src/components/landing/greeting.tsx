"use client";

import BlurFade from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";
import moment, { Moment } from "moment";
import Image from "next/image";
import { ReactElement } from "react";
import { FlipWords } from "@/components/ui/flip-words";
import Navigation from "./navigation";

const Greeting = (): ReactElement => {
    const now: Moment = moment(Date.now());
    return (
        <section className="flex flex-col gap-5 items-center">
            <BlurFade delay={0.3} inView>
                <Image
                    className="shadow-2xl shadow-blue-500 rounded-full scale-90 sm:scale-100 select-none pointer-events-none transition-all transform-gpu"
                    src="/me.png"
                    alt="My Selfie (:"
                    width={174}
                    height={174}
                />
            </BlurFade>

            <BlurFade delay={0.6} inView>
                <h1
                    className={cn(
                        "flex gap-2 justify-center items-center text-3xl sm:text-4xl font-bold select-none pointer-events-none transition-all transform-gpu",
                        "text-black dark:text-transparent bg-clip-text bg-gradient-to-br from-zinc-300/60 to-white"
                    )}
                >
                    Hello, I&apos;m
                    <span className="text-blue-600 dark:text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-300">
                        Braydon
                    </span>
                    <span>
                        <Image
                            src="/waving-hand.gif"
                            alt="Waving Hand"
                            width={32}
                            height={32}
                            unoptimized
                        />
                    </span>
                </h1>
            </BlurFade>

            <BlurFade delay={0.9} inView>
                <FlipWords
                    className={cn(
                        "-mt-3 p-0 max-w-[23rem] text-sm sm:text-base text-center select-none pointer-events-none transition-all transform-gpu",
                        "text-black dark:!text-transparent bg-clip-text bg-gradient-to-br from-zinc-300/85 to-white"
                    )}
                    words={[
                        `A ${now.diff(moment([2002, 10, 13]), "years")} year old${" "}
			passionate software engineer living in Canada with ${moment([2016, 8, 1]).fromNow(true)} of experience!`,
                    ]}
                />
            </BlurFade>

            <BlurFade className="mt-3.5" delay={1.25} inView>
                <Navigation />
            </BlurFade>
        </section>
    );
};
export default Greeting;

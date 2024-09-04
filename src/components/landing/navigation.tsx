"use client";

import { ReactElement, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    BriefcaseIcon,
    ServerStackIcon,
    WrenchIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import BlurFade from "@/components/ui/blur-fade";
import HomelabContent from "./nav-content/homelab";
import Skills from "./nav-content/skills";
import MyWork from "./nav-content/my-work";
import NavigationItem from "@/types/navigation";
import DiscordStatus from "@/components/landing/discord-status";

const items: NavigationItem[] = [
    {
        name: "My Work",
        icon: <BriefcaseIcon width={22} height={22} />,
        content: <MyWork />,
    },
    {
        name: "Skills",
        icon: <WrenchIcon width={22} height={22} />,
        content: <Skills />,
    },
    {
        name: "Homelab",
        icon: <ServerStackIcon width={22} height={22} />,
        content: <HomelabContent />,
    },
];

const Navigation = (): ReactElement => {
    const [selected, setSelected] = useState<NavigationItem | undefined>(
        undefined
    );
    return (
        <div className="h-[20rem] flex flex-col">
            {/* Selection Buttons */}
            <div className="flex gap-3 sm:gap-6 justify-center transition-all transform-gpu">
                {items.map((item, index) => {
                    const active: boolean = selected === item;
                    return (
                        <BlurFade key={index} delay={0.9 + 0.3 * index} inView>
                            <Button
                                className={cn(
                                    "px-3 sm:px-4 py-6 gap-2 shadow-sm bg-white/75 dark:bg-zinc-800/75 rounded-xl hover:opacity-75 transition-all transform-gpu",
                                    active && "opacity-70"
                                )}
                                variant="ghost"
                                onClick={() =>
                                    setSelected(active ? undefined : item)
                                }
                            >
                                {item.icon}
                                {item.name}
                            </Button>
                        </BlurFade>
                    );
                })}
            </div>

            {/* Selected Content */}
            <BlurFade className="mt-6" delay={1.95} inView>
                {selected ? (
                    <BlurFade
                        key={selected.name}
                        className="flex justify-center"
                        delay={0.05}
                        inView
                    >
                        {selected.content}
                    </BlurFade>
                ) : (
                    <DiscordStatus />
                )}
            </BlurFade>
        </div>
    );
};
export default Navigation;

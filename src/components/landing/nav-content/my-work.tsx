"use client";

import { MagicCard } from "@/components/ui/magic-card";
import moment from "moment";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";
import Link from "next/link";
import { ReactElement } from "react";
import Project from "@/types/project";
import Image from "next/image";

const projects: Project[] = [
    {
        name: "This Website!",
        description: "This website!",
        icon: "/me.png",
        link: "https://github.com/Rainnny7/rainnny.club",
        startDate: moment([2024, 7, 29]),
    },
    {
        name: "WildNetwork",
        description:
            "WildNetwork is a Minecraft server that contains multiple gamemodes, one of which is Prison, which is the most popular. I first joined the server as a Developer where I would work behind the scenes to create new features, now I&apos;m currently working as a System Administrator.",
        icon: "https://cdn.rainnny.club/x6m1QENM9gZz.png",
        link: "https://discord.gg/WildPrison",
        startDate: moment([2020, 7, 1]),
    },
    {
        name: "Bonfire",
        description:
            "Bonfire is a platform similar to Discord that a friend and I are working on together in our free time. Bonfire is perfect for connecting with friends or building a global community. Personalize your space to chat, and hang out.",
        icon: "https://bonfire.wtf/media/logo.png",
        link: "https://bonfire.wtf",
        startDate: moment([2024, 3, 30]),
    },
    {
        name: "Lucity",
        description:
            "Lucity was a minigame network for the game Minecraft, and was owned by the YouTuber iamLucid. When I worked at Lucity, I was the development lead, I focused mainly on infrastructure, databases, and monitoring systems. A few things that I have made - a dynamically managed server system, proxy rotation via the TCPShield API, and an API that can interact with the entire network from a normal Java app.",
        icon: "https://cdn.rainnny.club/UWdilkRUqTYl.png",
        link: "https://youtube.com/@iamLucid",
        startDate: moment([2020, 7, 1]),
        endDate: moment([2022, 10, 30]),
    },
    {
        name: "Rainplex",
        description:
            "Rainplex was a remake of the once popular Minecraft server, Mineplex. Rainplex initially came to light using the plugin, Skript where it just contained a Hub. After some time, the entirety of the network was re-coded in the Java programming from the ground up. Rainplex went through numerous re-codes over the time it was active, however I have since abandoned development due to lack of free time.",
        icon: "https://cdn.rainnny.club/QC742YfKVcyI.png",
        startDate: moment([2018, 8, 1]),
        endDate: moment([2021, 6, 11]),
    },
    {
        name: "Arcane Client",
        description:
            "Arcane is the all-in-one Minecraft mod pack. This client was built to be similar to LunarClient for portfolio and experience sake. I have since abandoned development due to lack of free time.",
        icon: "https://cdn.rainnny.club/MT45sXzZtah4.png",
        link: "https://github.com/ArcaneClientNET",
        startDate: moment([2021, 6, 1]),
        endDate: moment([2021, 10, 1]),
    },
];

const MyWork = (): ReactElement => {
    const { theme }: UseThemeProps = useTheme();
    return (
        <div className="max-w-[55rem] flex flex-wrap gap-3 justify-center">
            {projects.map((project, index) => (
                <Link key={index} href={project.link || "#"} target="_blank">
                    <MagicCard
                        className="w-[25rem] p-2.5 cursor-default opacity-95"
                        gradientColor={theme === "dark" ? "#262626" : "#D9D9D9"}
                    >
                        {/* Icon, Name & Years Active */}
                        <div className="flex gap-2.5 items-center">
                            <Image
                                className="rounded-full"
                                src={project.icon}
                                alt={`The ${project.name} Project Icon`}
                                width={24}
                                height={24}
                            />

                            <h1 className="font-semibold select-none pointer-events-none">
                                {project.name}
                            </h1>
                            <div className="flex gap-1">
                                <span className="text-green-400/80">
                                    {project.startDate.format("MMM YYYY")}
                                </span>
                                -
                                {project.endDate ? (
                                    <span className="text-red-400/80">
                                        {project.endDate.format("MMM YYYY")}
                                    </span>
                                ) : (
                                    <span className="text-green-400/80">
                                        Present
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="mt-2.5 line-clamp-3 text-black dark:!text-transparent bg-clip-text bg-gradient-to-br from-zinc-300/80 to-white">
                            {project.description}
                        </p>
                    </MagicCard>
                </Link>
            ))}
        </div>
    );
};
export default MyWork;

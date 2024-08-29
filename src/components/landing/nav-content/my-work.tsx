"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/utils";
import moment, { Moment } from "moment";
import { useTheme } from "next-themes";
import { UseThemeProps } from "next-themes/dist/types";
import Link from "next/link";
import { ReactElement } from "react";

type Project = {
	name: string;
	link?: string | undefined;
	previewContent: ReactElement;
	startDate: Moment;
	endDate?: Moment | undefined;
};

const projects: Project[] = [
	{
		name: "This Website!",
		link: "https://github.com/Rainnny7/rainnny.club",
		previewContent: <div>This website!</div>,
		startDate: moment([2024, 7, 29]),
	},
	{
		name: "WildNetwork",
		link: "https://discord.gg/WildPrison",
		previewContent: (
			<p>
				WildNetwork is a Minecraft server that contains multiple gamemodes, one
				of which is Prison, which is the most popular. I first joined the server
				as a Developer where I would work behind the scenes to create new
				features, now I&apos;m currently working as a System Administrator.
			</p>
		),
		startDate: moment([2020, 7, 1]),
	},
	{
		name: "Lucity",
		link: "https://youtube.com/@iamLucid",
		previewContent: (
			<p>
				Lucity was a minigame network for the game Minecraft, and was owned by
				the YouTuber iamLucid. When I worked at Lucity, I was the development
				lead, I focused mainly on infrastructure, databases, and monitoring
				systems. A few things that I have made - a dynamically managed server
				system, proxy rotation via the TCPShield API, and an API that can
				interact with the entire network from a normal Java app.
			</p>
		),
		startDate: moment([2020, 7, 1]),
		endDate: moment([2022, 10, 30]),
	},
	{
		name: "Rainplex",
		previewContent: (
			<p>
				Rainplex was a remake of the once popular Minecraft server, Mineplex.
				Rainplex initially came to light using the plugin, Skript where it just
				contained a Hub. After some time, the entirety of the network was
				re-coded in the Java programming from the ground up. Rainplex went
				through numerous re-codes over the time it was active, however I have
				since abandoned development due to lack of free time.
			</p>
		),
		startDate: moment([2018, 8, 1]),
		endDate: moment([2021, 6, 11]),
	},
	{
		name: "Arcane Client",
		link: "https://github.com/ArcaneClientNET",
		previewContent: (
			<p>
				Arcane is the all-in-one Minecraft mod pack. This client was built to be
				similar to LunarClient for portfolio and experience sake. I have since
				abandoned development due to lack of free time.
			</p>
		),
		startDate: moment([2021, 6, 1]),
		endDate: moment([2021, 10, 1]),
	},
];

const MyWork = (): ReactElement => {
	const { theme }: UseThemeProps = useTheme();
	return (
		<div className="max-w-[50rem] flex flex-wrap gap-3 justify-center">
			{projects.map((project, index) => (
				<Link key={index} href={project.link || "#"} target="_blank">
					<MagicCard
						className="w-[15rem] p-3.5"
						gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
					>
						<h1 className="font-bold select-none pointer-events-none">
							{project.name}
						</h1>

						{/* Years Active */}
						<h2>
							{project.startDate.format("MMM YYYY")}
							{project.endDate && ` - ${project.endDate.format("MMM YYYY")}`}
						</h2>
					</MagicCard>
				</Link>
			))}
		</div>
	);
};
export default MyWork;

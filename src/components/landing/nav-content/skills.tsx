import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import SimpleTooltip from "@/components/ui/simple-tooltip";

type Skill = {
	name: string;
	icon: string;
	link: string;
};

const skillset: Skill[] = [
	// Languages
	{
		name: "Java",
		icon: "https://img.icons8.com/color/2x/java-coffee-cup-logo.png",
		link: "https://www.java.com",
	},
	{
		name: "JavaScript",
		icon: "https://img.icons8.com/fluent/2x/javascript.png",
		link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
	},
	{
		name: "CSS",
		icon: "https://img.icons8.com/fluent/2x/css3.png",
		link: "https://www.w3schools.com/css",
	},

	// Operating Systems
	{
		name: "Linux",
		icon: "https://img.icons8.com/color/2x/linux.png",
		link: "https://www.linux.org",
	},
	{
		name: "Bash",
		icon: "https://img.icons8.com/color/2x/bash.png",
		link: "https://www.gnu.org/software/bash",
	},

	// Databases
	{
		name: "MariaDB",
		icon: "https://img.icons8.com/fluent/2x/maria-db.png",
		link: "https://mariadb.org",
	},
	{
		name: "MongoDB",
		icon: "https://img.icons8.com/color/2x/mongodb.png",
		link: "https://www.mongodb.com",
	},
	{
		name: "Redis",
		icon: "https://img.icons8.com/color/2x/redis.png",
		link: "https://redis.io",
	},

	// Software
	{
		name: "Git",
		icon: "https://img.icons8.com/color/2x/git.png",
		link: "https://git-scm.com",
	},
	{
		name: "Docker",
		icon: "https://img.icons8.com/fluent/2x/docker.png",
		link: "https://www.docker.com",
	},
	{
		name: "Jenkins",
		icon: "https://img.icons8.com/color/2x/jenkins.png",
		link: "https://www.jenkins.io",
	},
	{
		name: "Figma",
		icon: "https://img.icons8.com/fluent/2x/figma.png",
		link: "https://www.figma.com",
	},
	{
		name: "Postman",
		icon: "https://img.icons8.com/dusk/2x/postman-api.png",
		link: "https://www.postman.com",
	},

	// Frameworks & Libraries
	{
		name: "Maven",
		icon: "/maven.png",
		link: "https://maven.apache.org",
	},
	{
		name: "NPM",
		icon: "https://img.icons8.com/color/2x/npm.png",
		link: "https://www.npmjs.com",
	},
	{
		name: "React",
		icon: "https://img.icons8.com/dusk/2x/react.png",
		link: "https://reactjs.org/",
	},
	{
		name: "NextJS",
		icon: "https://img.icons8.com/color/2x/nextjs.png",
		link: "https://nextjs.org/",
	},
	{
		name: "TailwindCSS",
		icon: "https://img.icons8.com/color/2x/tailwindcss.png",
		link: "https://tailwindcss.com",
	},
	{
		name: "Redux",
		icon: "https://img.icons8.com/color/2x/redux.png",
		link: "https://redux.js.org",
	},
	{
		name: "Nginx",
		icon: "https://img.icons8.com/color/2x/nginx.png",
		link: "https://www.nginx.com",
	},
];

const Skills = (): ReactElement => (
	<div className="max-w-[30rem] flex flex-wrap gap-3 justify-center">
		{skillset.map((skill, index) => (
			<Link key={index} className="cursor-default" href={skill.link}>
				<SimpleTooltip content={skill.name}>
					<Image
						src={skill.icon}
						alt={`${skill.name} Skill Logo`}
						width={36}
						height={36}
					/>
				</SimpleTooltip>
			</Link>
		))}
	</div>
);
export default Skills;

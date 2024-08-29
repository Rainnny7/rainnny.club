import { ReactElement } from "react";

type Project = {
	name: string;
	git: string;
	content: ReactElement;
};

const projects: Project[] = [
	{
		name: "This Website!",
		git: "https://github.com/Rainnny7/rainnny.club",
		content: <div>This website</div>,
	},
];

const MyWork = (): ReactElement => (
	<div className="flex gap-3 justify-center">MY WORK HELLO</div>
);
export default MyWork;

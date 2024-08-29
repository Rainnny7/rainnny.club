import { ReactElement } from "react";
import { Moment } from "moment/moment";

type Project = {
    name: string;
    description: string;
    icon: string;
    previewContent?: ReactElement | undefined;
    link?: string | undefined;
    startDate: Moment;
    endDate?: Moment | undefined;
};
export default Project;

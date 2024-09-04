"use client";

import { ReactElement, useEffect, useState } from "react";
import { Data, DiscordUser, useLanyardWS } from "use-lanyard";
import DCDNUser from "@/types/dcdn";
import axios from "axios";
import Image from "next/image";
import { cn } from "@/lib/utils";

const statusColors = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-zinc-500",
};

const userBadges = {
    // Nitro
    "https://cdn.discordapp.com/badge-icons/2ba85e8026a8614b640c2837bcdfe21b.png":
        (dcdnUser: DCDNUser) => dcdnUser.premiumType,

    // Early Supporter
    "https://cdn.discordapp.com/badge-icons/7060786766c9c840eb3019e725d2b358.png":
        (dcdnUser: DCDNUser) => (dcdnUser.flags & (1 << 9)) === 1 << 9,

    // Active Developer
    "https://cdn.discordapp.com/badge-icons/6bdc42827a38498929a4920da12695d9.png":
        (dcdnUser: DCDNUser) => (dcdnUser.flags & (1 << 22)) === 1 << 22,
};

const DiscordStatus = (): ReactElement | undefined => {
    // Data from Lanyard
    const discordData: Data | undefined = useLanyardWS("504147739131641857");
    const discordUser: DiscordUser | undefined = discordData?.discord_user;

    // Some data isn't provided by Lanyard, use DCDN for more
    const [dcdnUser, setDCDNUser] = useState<DCDNUser | undefined>(undefined);

    // When the data changes, update the DCDN user
    useEffect(() => {
        if (!discordUser) {
            return;
        }
        axios
            .get(`https://dcdn.dstn.to/profile/${discordUser.id}`)
            .then((res) =>
                setDCDNUser({
                    premiumType: res.data.premium_type,
                    ...res.data.user,
                })
            );
    }, [discordData]);

    // Missing required data
    if (!discordData || !discordUser || !dcdnUser) {
        return undefined;
    }

    return (
        <div className="flex justify-center">
            <div className="flex flex-col bg-zinc-900 rounded-xl">
                <BannerAvatar
                    discordData={discordData}
                    discordUser={discordUser}
                    dcdnUser={dcdnUser}
                />

                <div className="px-3.5 pt-1.5 py-2.5 flex flex-col">
                    <div className="ml-[5.65rem] flex items-center">
                        {dcdnUser.bio && <Bio dcdnUser={dcdnUser} />}
                        <Badges dcdnUser={dcdnUser} />
                    </div>
                    <div className="mt-3">
                        <Username discordUser={discordUser} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const BannerAvatar = ({
    discordData,
    discordUser,
    dcdnUser,
}: {
    discordData: Data;
    discordUser: DiscordUser;
    dcdnUser: DCDNUser;
}): ReactElement => (
    <div className="relative select-none">
        <Image
            className="rounded-t-xl"
            src={`https://cdn.discordapp.com/banners/${discordUser.id}/${dcdnUser.banner}.webp?size=1024`}
            alt={`${discordUser.username}'s Banner`}
            width={300}
            height={300}
        />
        <div className="relative">
            <Image
                className="absolute left-2 -bottom-12 border-[5px] border-zinc-900 rounded-full"
                src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.webp?size=1024`}
                alt={`${discordUser.username}'s Avatar`}
                width={96}
                height={96}
            />
            <div
                className={cn(
                    "absolute left-[4.5rem] -bottom-12 w-7 h-7 border-[5px] border-zinc-900 rounded-full",
                    statusColors[discordData.discord_status]
                )}
            />
        </div>
    </div>
);

const Bio = ({ dcdnUser }: { dcdnUser: DCDNUser }): ReactElement => (
    <div className="p-2 bg-zinc-950/75 text-sm rounded-xl select-none">
        {dcdnUser.bio}
    </div>
);

const Badges = ({ dcdnUser }: { dcdnUser: DCDNUser }): ReactElement => (
    <div className="ml-auto flex gap-1">
        {Object.entries(userBadges)
            .filter(([_, predicate]) => predicate(dcdnUser))
            .map(([badge], index) => (
                <Image
                    key={index}
                    src={badge}
                    alt="Discord Profile Badge"
                    width={22}
                    height={22}
                />
            ))}
    </div>
);

const Username = ({
    discordUser,
}: {
    discordUser: DiscordUser;
}): ReactElement => (
    <div className="flex flex-col">
        <h1 className="text-lg font-bold leading-none">
            {discordUser.global_name}
        </h1>
        <h2 className="font-light opacity-70">{discordUser.username}</h2>
    </div>
);

export default DiscordStatus;

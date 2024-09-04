/**
 * The user type from <a href="https://dcdn.dstn.to/profile/504147739131641857">DCDN</a>
 */
type DCDNUser = {
    flags: number;
    banner: string | undefined;
    bio: string | undefined;
    premiumType: number | undefined; // 1 = Nitro Classic, 2 = Nitro
};
export default DCDNUser;

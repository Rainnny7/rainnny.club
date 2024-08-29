import { ReactElement } from "react";

const HomelabContent = (): ReactElement => (
    <ul className="text-sm sm:text-base pointer-events-none">
        <li>
            <b>Server Rack:</b> 22U, 32&quot; Depth
        </li>
        <li>
            <b>Router:</b> UDM Pro
        </li>
        <li>
            <b>UPS:</b> 1350VA
        </li>
        <li className="my-2.5" />
        <li>
            <b>Proxmox Node-01:</b>
            <li>
                - <b>Motherboard:</b> Prime B550-PLUS
            </li>
            <li>
                - <b>CPU:</b> Ryzen 5 5600G
            </li>
            <li>
                - <b>RAM:</b> 38GB of DDR4 @ 3200Mhz
            </li>
            <li>
                - <b>Storage:</b> 8TB (x2 4TB, x1 4TB Parity) Unraid Array
            </li>
        </li>
    </ul>
);
export default HomelabContent;

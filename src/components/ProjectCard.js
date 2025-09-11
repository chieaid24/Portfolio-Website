'use client';

import { useEffect, useMemo, useState } from "react";
import RewardProjectLink from "@/components/RewardProjectLink";
import Image from "next/image";
import { getOrCreateTicket } from "@/lib/ticket-store";
import Decimal from 'decimal.js';
import ProjectTicket from "@/icons/ProjectTicket";


export default function ProjectCard({ title, generated_with, ticket_no, fallback_value, skills_used, image, slug }) {
    const [ticket, setTicket] = useState({
        number: ticket_no ?? "",
    });

    useEffect(() => {
        // seed with the prop once (if present), otherwise generate & persist
        const t = getOrCreateTicket(slug, {
            number: ticket_no,
        });
        setTicket(t);
    }, [slug, ticket_no]);

    const addedTicketValue = useMemo(() => {
        if (!ticket.value) return "0";
        const clean = String(ticket.value).replace(/[^0-9.-]/g, "");
        try {
            return new Decimal(clean).div(1000).toString();
        } catch {
            return "0";
        }
    }, [ticket.value]);

    return (
        <div>
            <RewardProjectLink href={`/projects/${slug}`} className="block font-dm-sans group" rewardId={`project:${slug}`} ticketValue={addedTicketValue}>
                <div className="flex relative justify-center">
                    <div className="relative w-[500px] aspect-[2] overflow-hidden rounded-lg shadow-[-4px_4px_4px_0px_rgba(0,0,0,0.25)] ">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover z-0 transition-transform duration-300 group-hover:scale-101" />
                        <ul className="absolute w-full flex flex-wrap justify-end gap-3 pt-3 pr-3 text-[16px]"> {/**skills used div */}
                            {skills_used.map((lang, i) => (
                                <li key={i} className="bg-custom-red px-2 py-[1px] rounded-md text-white font-semibold tracking-wider opacity-90 hover:opacity-80 transition-opacity duration-200">
                                    #{lang}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="absolute -translate-x-[4.4px] translate-y-[125%] group-hover:translate-y-[121%] w-full flex flex-col items-center transition-transform duration-300 group-hover:duration-300 group-hover:scale-102">
                        <div className="relative">
                            {/* <CardLabel /> */}
                            <div className="text-[#fffbf6] dark:text-[#565860]">
                                <ProjectTicket className="w-[459px] h-[132px]" />
                            </div>
                            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-black dark:text-white w-full ml-[4px]">
                                <div className="font-bold text-[0.7rem] mb-[-5px] mt-[-5px] opacity-50">
                                    CASHOUT VOUCHER
                                </div>
                                <div className="text-dark-grey-text font-black text-[39px] my-[-9px] tracking-tight">
                                    {title}
                                </div>
                                <div className="overflow-hidden mt-[-6px] w-[240px] h-[30px] opacity-12 dark:opacity-25">
                                    <img
                                        src="/icons/barcode_hireme.svg"
                                        alt="Hire me barcode"
                                        className="block w-full h-auto dark:invert"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <div className="flex justify-between font-bold w-[260px] opacity-50 mt-1">
                                    <div className="text-[10px]">GENERATED WITH: {generated_with}</div>
                                    <div className="text-[10px]">TICKET # {ticket.number || '—'}</div>
                                </div>
                                <div className="font-bold mt-[-3px] text-[14px] opacity-65">
                                    ${ticket.value || ' ——'}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </RewardProjectLink>
        </div>

    );
}
// width={800}
// height={10} style={{ width: '100%', height: 'auto' }} />
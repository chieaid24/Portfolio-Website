'use client';

import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({ title, generated_with, ticket_no, skills_used, image, slug }) {
    return (
        <div>
            <Link href={`/projects/${slug}`} className="block font-dm-sans group">
                <div className="flex relative justify-center">
                    <div className="relative w-[500px] aspect-[2] overflow-hidden rounded-lg shadow-[-4px_4px_4px_0px_rgba(0,0,0,0.25)] ">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover z-0 transition-transform duration-300 saturate-70 group-hover:saturate-100 group-hover:scale-101" />
                        <ul className="absolute w-full flex flex-wrap justify-end gap-4 pt-5 pr-5 text-[16px]"> {/**skills used div */}
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
                            <Image src="/illu_card_1.svg" 
                            width={459}
                            height={132}
                            alt="Project ticket"
                            />
                            <div className="absolute inset-0 flex flex-col justify-center items-center z-10 text-black w-full ml-[4px]">
                                <div className="font-bold text-[0.7rem] mb-[-5px] mt-[-5px] text-black opacity-50">
                                    CASHOUT VOUCHER
                                </div>
                                <div className="text-dark-grey-text font-black text-[39px] my-[-9px] tracking-tight">
                                    {title}
                                </div>
                                <div className="overflow-hidden mt-[-5px] w-[240px] h-[30px] opacity-12">
                                    <Image
                                        src="/barcode_hireme.svg"
                                        alt="Barcode"
                                        width={800}
                                        height={10}
                                        className=""
                                        style={{ width: '100%', height: 'auto' }} />
                                </div>
                                <div className="flex justify-between font-bold w-[235px] opacity-50">
                                    <div className="text-[10px]">GENERATED WITH: {generated_with}</div>
                                    <div className="text-[10px]">VER 1.0</div>
                                </div>
                                <div className="font-bold mt-[-2px] text-[14px] opacity-50">
                                    TICKET # {ticket_no}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Link>
        </div>

    );
}
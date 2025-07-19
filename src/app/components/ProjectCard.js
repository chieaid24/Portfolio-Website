import Link from "next/link";
import Image from "next/image";
import CardLabel from "./CardLabel.js";

export default function ProjectCard({ title, generated_with, ticket_no, skills_used, image, slug }) {
    return (
        <Link href={`/projects/${slug}`} className="block">
            <div className="flex relative justify-center">
                <div className="relative w-full aspect-[2] overflow-hidden rounded-lg shadow-[-4px_4px_4px_0px_rgba(0,0,0,0.25)]">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover z-0" />
                    <ul className="absolute flex flex-wrap gap-2 text-xs"> {/**skills used div */}
                        {skills_used.map((lang, i) => (
                            <li key={i} className="bg-gray-100 px-2 py-1 rounded-md text-gray-800">
                                {lang}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="absolute -translate-x-[4.4px] translate-y-[130%]">
                    <CardLabel />
                </div>
            </div>



            <div> {/**label div */}

            </div>
            <div className="text-lg font-bold">{title}</div>
            <div className="text-sm text-gray-600 mb-2">{generated_with}</div>
            <div className="text-xs text-gray-500 mb-4">Ticket: {ticket_no}</div>

        </Link>
    );
}
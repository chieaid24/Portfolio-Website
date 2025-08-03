'use client';

import { useState } from "react";
import Image from "next/image"

export default function AboutImage() {
    const [imageHovered, setImageHovered] = useState(false);

    return (
        <div className="flex"> {/* #horiz arrow + (Image + label) */}
            <div className={`flex items-end mb-4 mr-1 transition-opacity ease-in-out ${imageHovered ? 'opacity-100 duration-300' : 'opacity-0 duration-600'}`}>
                <Image src="/about_image_arrow.svg"
                    alt=""
                    width={12}
                    height={12} />
            </div>
            <div className="flex flex-col gap-1"> {/* #vertical Image + label  */}
                <Image src="/about_image_1.png"
                    alt="A photo of Aidan Chien"
                    width={400}
                    height={400}
                    onMouseEnter={() => setImageHovered(true)}
                    onMouseLeave={() => setImageHovwered(false)}
                    className="rounded-md shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                />
                <div>
                    <p className={`text-xl font-medium text-light-grey-text font-dm-sans transition-opacity ease-in-out ${imageHovered ? 'opacity-100 duration-300' : 'opacity-0 duration-600'}`}>
                        at Maasai Mara National Park :{")"}
                    </p>
                </div>
            </div>
        </div>
    )
}
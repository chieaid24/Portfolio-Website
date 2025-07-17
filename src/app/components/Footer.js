import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-background-dark pt-10 pb-10">
            <div className="grid grid-cols-2">
                <div className="flex justify-center">
                    <p>
                        © 2025 AIDAN CHIEN. All rights reserved.<br />Designed and developed by AIDAN CHIEN
                    </p>
                </div>
                <div className="flex gap-5 relative justify-center h-[3em]">
                    <Link href="/">
                        <Image
                            src="/email-svgrepo-com 1-01.svg"
                            alt="hello"
                            width={24}
                            height={24}
                            className="w-auto">
                        </Image>
                    </Link>
                    <Link href="/">
                        <Image
                            src="/linkedin_icon.svg"
                            width={24}
                            height={24}
                            className="h-[3em] w-auto">
                        </Image>
                    </Link>
                    <Link href="/">
                        <Image
                            src="/github_icon.svg"
                            width={24}
                            height={24}
                            className="h-full w-auto">
                        </Image>
                    </Link>
                </div>
            </div>
        </footer>
    )
}
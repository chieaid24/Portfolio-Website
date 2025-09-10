import Image from "next/image";
import RewardLink from "@/components/RewardLink"; // <- use your wrapper

export default function Footer() {
  return (
    <footer className="bg-background-dark pt-15 pb-15">
      <div className="grid grid-cols-2  text-dark-grey-footer font-dm-sans font-normal">
        <div className="flex justify-center items-center text-lg leading-tight">
          <p>
            © 2025 AIDAN CHIEN. All rights reserved.<br />Designed and developed by AIDAN CHIEN.
          </p>
        </div>
        <div className="flex gap-12 justify-center items-center">
          <RewardLink
            href="https://www.linkedin.com/in/aidanchien/"
            target="_blank"
            rewardId="footer:linkedin"
          >
            <Image
              src="/icons/linkedin_icon.svg"
              alt="LinkedIn Icon"
              width={24}
              height={24}
              className="h-[2.6em] w-auto hover:translate-y-[-2px] transition-all duration-200"
            />
          </RewardLink>

          <RewardLink
            href="https://github.com/chieaid24"
            target="_blank"
            rewardId="footer:github"
          >
            <Image
              src="/icons/github_icon.svg"
              alt="GitHub Icon"
              width={25}
              height={25}
              className="h-[2.8em] w-auto mt-[-5%] hover:translate-y-[-2px] transition-all duration-200"
            />
          </RewardLink>
        </div>
      </div>
    </footer>
  );
}
import RewardLink from "@/components/RewardLink";
import FooterGithub from "@/icons/FooterGithub";
import FooterLinkedin from "@/icons/FooterLinkedin"


export default function Footer() {
  return (
    <footer className="bg-background-dark pt-15 pb-15">
      <div className="grid grid-cols-2  text-dark-grey-footer font-dm-sans font-normal">
        <div className="flex justify-center items-center text-lg leading-tight">
          <p>
            © 2025 AIDAN CHIEN. All rights reserved.<br />Designed and developed by AIDAN CHIEN.
          </p>
        </div>
        <div className="flex gap-12 justify-center items-center text-[#4c4a48] dark:text-dark-grey-footer">
          <RewardLink
            href="https://www.linkedin.com/in/aidanchien/"
            target="_blank"
            rewardId="footer:linkedin"
          >
            <FooterLinkedin className="hover:translate-y-[-2px] transition-transform duration-200 shrink-0 h-[45px] w-[45px]"/>
          </RewardLink>

          <RewardLink
            href="https://github.com/chieaid24"
            target="_blank"
            rewardId="footer:github"
          >
            <FooterGithub className="hover:translate-y-[-2px] transition-transform duration-200 shrink-0 block leading-none align-middle overflow-visible h-12 w-12"/>
          </RewardLink>
        </div>
      </div>
    </footer>
  );
}
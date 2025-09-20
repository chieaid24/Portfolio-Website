import RewardLink from "@/components/RewardLink";
import FooterGithub from "@/icons/FooterGithub";
import FooterLinkedin from "@/icons/FooterLinkedin"


export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-background-dark pt-6 pb-8 sm:pt-15 sm:pb-15">
      <div className="sm:max-w-screen-xl lg:max-w-[65rem] xl:max-w-[70rem] 2xl:max-w-[70rem] mx-auto w-full 2xl:w-[69%] px-5 lg:px-6">
        <div className="flex flex-col sm:grid sm:grid-cols-2 text-dark-grey-footer font-dm-sans font-normal gap-6 sm:gap-0 max-w-full sm:justify-between">
          <div className="flex justify-center sm:justify-start items-center text-sm md:text-lg leading-tight order-2 sm:order-1">
            <p>
              © {currentYear} AIDAN CHIEN. All rights reserved.<br />Designed and developed by AIDAN CHIEN.
            </p>
          </div>
          <div className="flex gap-3 sm:gap-12 justify-center sm:justify-end items-center text-[#4c4a48] dark:text-dark-grey-footer order-1 sm:order-2">
            <RewardLink
              href="https://www.linkedin.com/in/aidanchien/"
              target="_blank"
              rewardId="footer:linkedin"
              className='p-3 sm:p-0'
            >
              <FooterLinkedin className="hover:translate-y-[-2px] transition-transform duration-200 shrink-0 h-[32px] w-[32px] sm:h-[45px] sm:w-[45px]" />
            </RewardLink>
            <RewardLink
              href="https://github.com/chieaid24"
              target="_blank"
              rewardId="footer:github"
              className='p-3 sm:p-0'
            >
              <FooterGithub className="hover:translate-y-[-2px] transition-transform duration-200 shrink-0 block leading-none align-middle overflow-visible h-[35px] w-[35px] sm:h-12 sm:w-12" />
            </RewardLink>
          </div>
        </div>
      </div>
    </footer> 
  );
}
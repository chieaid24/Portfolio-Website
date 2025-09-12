import Footer from "@/components/Footer";
import AboutImage from "@/components/AboutImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RedText from '@/components/RewardRedText';
import SpotifyEmbed from '@/components/SpotifyEmbed'
import ChessWidget from "@/components/ChessWidget";
import ClashWidget from "@/components/ClashWidget";
import WidgetCarousel from "@/components/WidgetCarousel";

export const metadata = {
  title: 'ABOUT',
  description: 'Who is Aidan Chien?',
};

const widgets = [
  {
    id: "spotify",
    title: "Spotify – My Playlist",
    element: <SpotifyEmbed playlistId="1oQngKRVkU7oI8hmB4hf7i" theme={0} />,
  },
  {
    id: "chess",
    title: "Chess.com",
    element: <ChessWidget />,
  },
  {
    id: "clash",
    title: "Clash Royale",
    element: <ClashWidget />,
  },
];

export default function AboutPage() {
  return (
    <div className="font-medium font-dm-sans">
      <div className="pt-20 bg-background-light text-dark-grey-text ">
        <MaxWidthWrapper>
          <div className="flex justify-start mt-6 sm:mt-8 lg:mt-12">  {/* Outer div that is a flex box so text acts as a single line of text when window shrinks + is centered as well */}
            <h1 className="text-8xl text-center text-dark-grey-text"> {/* Makes it so when text is shrunk, its paragraph alignment is center */}
              <span className="font-bold font-dm-sans">Who is </span>
              <span className="font-italiana">AIDAN CHIEN </span>
              <span className="font-bold font-dm-sans">?</span>
            </h1>
          </div>

          {/* image and blurb div */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start mt-10 break-normal">
            <AboutImage />

            <div className="flex justify-self-start text-left flex-col text-3xl text-dark-grey-text space-y-6">
              <p className="mt-0">
                I&apos;m a <RedText rewardId="red:about:syde">Systems Design Engineering</RedText>
                {" "}student at the University of Waterloo!
              </p>
              <p>
                I take pride in my ability to design and develop high quality solutions for <span className="whitespace-nowrap">
                  <RedText rewardId="red:about:software">software</RedText>,
                </span> <RedText rewardId="red:about:mechanical">mechanical</RedText>, and <RedText rewardId="red:about:electrical">electrical</RedText> systems.
              </p>
              <p>
                I&apos;m passionate about taking my skills to the next level and <RedText rewardId="red:about:impact">making an impact</RedText> on the greater community.
              </p>
            </div>
          </div>

          {/* Interest Section */}
          <div className="grid grid-cols-2 pt-4 pb-20">
            <div className="ml-3 pr-8">
              <h2 className="font-bold text-4xl leading-tight">You can also find me:</h2>
              <li className="marker:text-xl text-2xl font-normal pt-5"> Playing team sports
                <ul className="flex gap-2 pl-8 text-light-grey-text text-xl">
                  <li>→</li>
                  <li>Basketball and volleyball are my main ones right now!</li>
                </ul>
              </li>
              <li className="marker:text-xl text-2xl font-normal"> Rock climbing
                <ul className="flex gap-2 pl-8 text-light-grey-text text-xl">
                  <li>→</li>
                  <li>Mostly bouldering but I&apos;ve done a few outdoor top rope climbs!</li>
                </ul>
              </li>
              <li className="marker:text-xl text-2xl font-normal"> Filmmaking
                <ul className="flex gap-2 pl-8 text-light-grey-text text-xl">
                  <li>→</li>
                  <li>My preferred mode of creative expression, and I&apos;m always looking for inspiration for my next project!</li>
                </ul>
              </li>
            </div>
            <WidgetCarousel items={widgets} className="" />
          </div>

        </MaxWidthWrapper>
      </div>

      <Footer />
    </div>
  );
}

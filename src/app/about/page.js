import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutImage from "@/components/AboutImage";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const metadata = {
  title: 'ABOUT',
  description: 'Who is Aidan Chien?',
};

export default function AboutPage() {
  return (
    <>

      <div className="bg-background-light text-dark-grey-text">
        <Header />
        <MaxWidthWrapper>
          <div className="flex justify-start mt-6 sm:mt-8 lg:mt-12">  {/* Outer div that is a flex box so text acts as a single line of text when window shrinks + is centered as well */}
            <h1 className="text-8xl text-center text-dark-grey-text"> {/* Makes it so when text is shrunk, its paragraph alignment is center */}
              <span className="font-bold font-dm-sans">Who is </span>
              <span className="font-italiana">AIDAN CHIEN </span>
              <span className="font-bold font-dm-sans">?</span>
            </h1>
          </div>

          {/* image and blurb div */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start mt-10">
            <AboutImage />

            <div className="flex justify-self-start text-left flex-col text-3xl text-dark-grey-text space-y-6">
              <p className="mt-0">
                I'm a <span className="font-bold text-custom-red">Systems Design Engineering </span>
                student at the <span className="font-bold text-custom-red">University of Waterloo</span>!
              </p>
              <p>
                I take pride in my ability to design and develop <span className="font-bold">high quality solutions</span> for <span className="font-bold">software, mechanical, and electrical</span> systems.
              </p>
              <p>
                I'm passionate about taking my skills to the next level and <span className="font-bold">making an impact</span> on the greater community.
              </p>
            </div>
          </div>

          {/* Interest Section */}
          <div className="w-2/3 mt-0 ml-3 pb-10 font-dm-sans">
            <h2 className="font-bold text-4xl leading-12 mb-1">You can also find me:</h2>
            <li className="marker:text-xl text-2xl font-normal"> Playing team sports
              <ul className="flex gap-2 pl-8 text-light-grey-text text-xl">
                <li>→</li>
                <li>Basketball and volleyball are my main ones right now!</li>
              </ul>
            </li>
            <li className="marker:text-xl text-2xl font-normal"> Rock climbing
              <ul className="flex gap-2 pl-8 text-light-grey-text text-xl">
                <li>→</li>
                <li>Mostly bouldering but I've done a few outdoor top rope climbs!</li>
              </ul>
            </li>
            <li className="marker:text-xl text-2xl font-normal"> Filmmaking
              <ul className="flex gap-2 pl-8 text-light-grey-text text-xl">
                <li>→</li>
                <li>My preferred mode of creative expression, and I'm always looking for inspiration for my next project!</li>
              </ul>
            </li>
          </div>
        </MaxWidthWrapper>
      </div>
      <Footer />
    </>
  );
}

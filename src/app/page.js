import Header from "./components/Header";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import ProjectCard from "./components/ProjectCard";
import projects from "./data/projects";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
      <div className="bg-background-dark font-dm-sans text-dark-grey-text"> {/**hero div */}
        <Header />
        <div className="relative min-h-screen w-full">
          <MaxWidthWrapper>
            <div className="flex flex-col gap-10 pt-10">
              <div className="w-[95%] h-110 self-center bg-background-light shadow-[-4px_4px_4px_rgba(0,0,0,0.25)]"> {/* dummy div for the slot machine */}
              </div>
              <h1 className="text-left font-semibold text-4xl">
                Hi, I'm Aidan, a systems engineer passionate about efficient <span className="text-custom-red">design</span> and <span className="text-custom-red">development</span>.
              </h1>
              <h3 className="font-normal text-2xl">
                I'm someone who gets genuinely excited about learning new things—whether it's a coding trick, a design tool, or just figuring out how something works. I love chasing ideas that push me to grow and create in new ways. If you're curious what that looks like in action, check out my projects below—I promise they're more fun than your average to-do list!
              </h3>
            </div>
          </MaxWidthWrapper>
        </div>
      </div>
      <div className="bg-background-light text-dark-grey-text"> {/**project section */}
        <MaxWidthWrapper>
          <h1 className="font-bold text-7xl pt-15">
            My Projects
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 gap-y-20 mt-10 mb-32">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                generated_with={project.generated_with}
                ticket_no={project.ticket_no}
                skills_used={project.skills_used}
                image={project.image}
                slug={project.slug}
              />
            ))}
          </div>
        </MaxWidthWrapper>
        <div className="flex flex-col items-center pt-10 bg-background-dark text-dark-grey-text font-dm-sans text-8xl tracking-tighter font-semibold"> {/**want to cash out? section */}
            <h1>
              Want to <span className="animate-pulse gradient-text-custom font-semibold">cash out?</span>
            </h1>
            <h1 className="">
              Let's connect!
            </h1>
        </div>
        <Footer />
      </div>
    </>
  );
}

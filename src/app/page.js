'use client';

import { useEffect, useState } from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/app/data/projects";
import HeroSlot from "@/components/HeroSlot";
import RedText from '@/components/RewardRedText';
import RewardLink from '@/components/RewardLink';



export default function Home() {
  const [randomTickets, setRandomTickets] = useState({});

  useEffect(() => {
    const generateTicketNumbers = () => {
      const used = new Set(['69']);
      const ticketMap = {};

      projects.forEach((project) => {
        let ticket;
        do {
          const num = Math.floor(Math.random() * 99) + 1;
          ticket = num < 10 ? `0${num}` : num.toString();
        } while (used.has(ticket));
        used.add(ticket);
        ticketMap[project.slug] = ticket;
      });

      setRandomTickets(ticketMap);
    };

    generateTicketNumbers();

    const hash = window.location.hash;
    if (hash === '#projects') {
      setTimeout(() => {
        const section = document.getElementById('projects');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            history.replaceState(null, '', window.location.pathname);
          }, 1000);
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <div className="pt-25 bg-background-dark font-dm-sans text-dark-grey-text"> {/**hero div */}
        <div>
          <div id="hero" className="relative min-h-screen w-full">
            <MaxWidthWrapper>
              <div className="flex flex-col gap-10 pt-10">
                {/* <div className="justify-center flex"> */}
                  <HeroSlot />
                {/* </div> */}
                <h1 className="text-left font-semibold text-4xl">
                  Hi, I&apos;m Aidan, a systems engineer passionate about efficient <RedText rewardId="red:home:design" weight={"semibold"}>design</RedText> and <RedText rewardId="red:home:development" weight={"semibold"}>development</RedText>.
                </h1>
                <h3 className="font-regular text-2xl text-light-grey-text italic leading-normal">
                  Welcome to my portfolio site! Try clicking on projects, links, and <RedText rewardId="red:home:words" weight={"semibold"}>red words</RedText> to uncover new details and increase your earnings throughout the site. Scroll down to check out some of my other work—and good luck exploring :)
                </h3>
              </div>
            </MaxWidthWrapper>
          </div>
        </div>
        <div id="projects" className="bg-background-light text-dark-grey-text"> {/**project section */}
          <MaxWidthWrapper>
            <h1 className="font-bold text-6xl pt-15">
              My Projects
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 gap-y-20 mt-10 mb-32">
              {projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  generated_with={project.generated_with}
                  ticket_no={randomTickets[project.slug] ?? '--'}
                  skills_used={project.skills_used}
                  image={project.image}
                  slug={project.slug}
                  alt={project.title}
                  fallback_value={[10, project.fallback_value]}
                />
              ))}
            </div>
          </MaxWidthWrapper>
          <div className="flex flex-col items-center my-[-10px] pt-10 bg-background-dark text-dark-grey-text font-dm-sans text-8xl tracking-tighter font-semibold"> {/**want to cash out? section */}
            <div>
              <RewardLink href="mailto:aidan.chien@uwaterloo.ca" rewardId="home:cash-out"
                className="group hover:scale-110 hover:translate-y-[-15px] transition-all !duration-300 items-center inline-flex flex-col ">
                <h1>
                  Want to <span className="group-hover:animate-new-pulse group-hover:gradient-text-red-animated gradient-text-custom font-semibold animated-underline pr-0.5">cash out?</span>
                </h1>
                <h1 className="">
                  Let&apos;s connect!
                </h1>
              </RewardLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

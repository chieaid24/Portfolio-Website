import Link from 'next/link';
import RedText from "@/components/RewardRedText"

export const quest_totals = {
    redtext: 36,
    project: 4,
    link: 9,
};

/*  EMPTY TEMPLATE FOR NEW PROJECT!

    {
        slug: '', 
        title: '',
        generated_with: 'PYTHON + AHK', // appears on Card, what tools did you use?
        ticket_no: "25", //hard coded fall back value that will appear if actual random generation goes wrong,
        fallback_value: "17,230.00", //fallback ticket value that should be in this format (between 15000 and 18000, with comma, rounded to 10s place)
        skills_used: ['Python', 'OOP'], // red labels that appear on Card
        image: '/pmi_auto_generator/PMI Card2.png', // Card background image
        page_image_one: '/pmi_auto_generator/pmi_card.png', // image on the Page 1, this can also be a 3D model in the .glb format
        page_image_two: '/pmi_auto_generator/pmi_card.png', // image on the Page 2
        github_link: 'https://github.com/chieaid24/PMI-Auto-Generator-Desc',
        subtitle: "a machinist's best friend", // tagline that appears below the title on the Page
        summary: <> </>, // summary on the landing section of the Page
        tool_paragraphs: [
            <> 

            </>,
        ],
        why_paragraphs: [
            <>

            </>,
            <>

            </>
        ],
        what_paragraphs: [
            <>

            </>,
            <>

            </>,
        ],

        learning_paragraphs: [
            <>

            </>,
        ],
    },

    */

// image / second_image can also be 3D models, and will be conditionally rendered as so on the page
export const projects = [
    {
        slug: 'pmi-auto-generator',
        title: 'PMI Auto Generator',
        generated_with: 'PYTHON + AHK',
        ticket_no: "26",
        fallback_value: "16,230.00",
        skills_used: ['Python', 'OOP'],
        image: '/pmi_auto_generator/PMI Card2.png',
        page_image_one: '/pmi_auto_generator/pmi_card.png',
        page_image_two: '/pmi_auto_generator/pmi_card.png',
        github_link: 'https://github.com/chieaid24/PMI-Auto-Generator-Desc',
        subtitle: "a machinist's best friend",
        summary: <>Manually transferring info from a <RedText rewardId="red:pmi:technical-drawing">technical drawing</RedText> to a 3D <RedText rewardId="red:pmi:CAD-model">CAD model</RedText> can be tedious and the worst part of a machinist&apos;s day. Keep scrolling to find out how I cut production time by <RedText rewardId="red:pmi:30-percent">30 percent</RedText>! </>,
        tool_paragraphs: [
            <>I used <RedText rewardId="red:pmi:python">Python</RedText> for the logic and <RedText rewardId="red:pmi:ahk">AutoHotKey</RedText> for easy interfacing with applications. I also utilized MBDVidia&apos;s OCR for data extraction and file conversion.</>,
        ],
        why_paragraphs: [
            <>
                Working with CNC machinists at Autonomous Machining opened my eyes to the many unexpected challenges that come with producing machined parts, especially precision parts for aerospace and automotive systems. At first, I thought the buyer companies just sent a SOLIDWORKS model, the machinist hit a few buttons, and the machine would cut it out—simple, like a 3D printer. However, I quickly learned that this isn&apos;t the case, and there are very good reasons to why machinists get paid in this economy.
            </>,
            <>
                As a machinist, it makes life a lot easier to have a 3D model that includes Product and Manufacturing Information (PMI), such as desired dimensions, tolerances, and specifications. This allows you to create machine paths and quality assurance procedures to the specs of the buyer. But due to old-fashioned &quot;this is the way it&apos;s always been done&quot; practices, many times the machine shop only receives a stripped-down (no PMI) 3D model and a 2D PDF containing the necessary specifications. Someone then must manually annotate the model, which is a tedious and time-consuming task, especially for a small team like the one I worked with at my internship. Seeing this, I realized it had to change, and that was the birth of my PMI Auto Generator.
            </>
        ],
        what_paragraphs: [
            <>
                Building on a blank 3D model and a PDF containing the necessary specifications, this is a Python application built to automatically attach all diameter annotations directly onto the 3D model. To format the files as needed, I created an AutoHotKey script to run on MBDVidia, the MBD software we used in the shop to attach the annotations. With a generated UI, the program guides the user to extract the annotations from the PDF into an Excel sheet, and convert the 3D model .stl or .sldprt file to a .qif file.
            </>,
            <>
                The .qif file is the key that my program relies on, as its <RedText rewardId="red:pmi:xml">XML structure</RedText> allows me to parse and insert information without a GUI. This unlocks automation and greater speed capabilities, which I take advantage of through this project. Now, using Python with NumPy and openpyxl, it scrapes the Excel file and formats each entry to scan for diameter annotations. I&apos;ve picked diameter annotations because the shop mostly worked with turned (cylindrical) parts, so diameter annotations made up about one-third of all dimensions.
            </>,
            <>
                The program then gets all of the dimensions from the model .qif file and cross-references each with the desired diameter dimensions. Lastly, it inserts those annotations onto the model. Then the user can simply open the .qif file and attach the rest of the annotations manually with the help of my <Link href="/projects/mbd-macro"><span className="hover:opacity-80 transition font-semibold">MBD Macro</span></Link>. This project single-handedly saves around 30% of the total annotation time, and the full process takes only about 60 seconds to complete.
            </>
        ],

        learning_paragraphs: [
            <>
                I strengthened my Python and scripting skills, as well as my understanding of best practices for writing scalable and intuitive code such that non-experts could understand and use it effectively. This included creating <RedText rewardId="red:pmi:sop">Standard Operating Procedures</RedText> (SOP) documentation and oral presentations to the team. Some challenges that I faced included extracting data from non-standard part drawing PDFs, as well as completely reverse-engineering the QIF format with few available resources. This project also attracted the attention of the company&apos;s CEO, who invited me to present my work to the parent company, and I received a light round of applause as I concluded.
            </>,
        ],
    },
    {
        slug: 'personal-website',
        title: 'Personal Website',
        generated_with: 'NEXT + TAILWIND',
        ticket_no: "73",
        fallback_value: "17,390.00",
        skills_used: ['React', 'Web Development', 'Full Stack Development'],
        image: '/personal_website/card_image.jpg',
        page_image_one: '/personal_website/card_image.jpg',
        github_link: 'https://github.com/chieaid24/Personal-Website',
        subtitle: "a portfolio that performs",
        summary: <>A plain resume displaying my projects is boring and, frankly, too easy to make. Find out how I built the <RedText rewardId="red:website:very-website">very website</RedText> you&apos;re on <RedText rewardId="red:website:scratch">from scratch!</RedText> </>,
        tool_paragraphs: [
            <>The main framework I used was <RedText rewardId="red:website:next">Next.js</RedText> with <RedText rewardId="red:website:react">React</RedText>, styled using <RedText rewardId="red:website:tailwind">Tailwind CSS</RedText> and <RedText rewardId="red:website:framer">Framer Motion</RedText>. I also used <RedText rewardId="red:website:node">Node.js</RedText> to connect with REST APIs for real-time updates, <RedText rewardId="red:website:figma">Figma</RedText> to prototype the interface, and <RedText rewardId="red:website:illustrator">Illustrator</RedText> to create my logo and other assets.</>,
        ],
        why_paragraphs: [
            <>
                I&apos;ve always wanted my own domain—something about owning a part of the internet seemed so cool. And creating a personal portfolio with some extra fluff seemed like the perfect idea. The slot machine concept just kind of came to me, and I rolled with it, creating an overarching theme for the site.
            </>,
        ],
        what_paragraphs: [
            <>
                TBD!!
            </>,
            <>

            </>,
        ],

        learning_paragraphs: [
            <>
                TBD!!
            </>,
        ],
    },
    {
        slug: '3d-tools',
        title: '3D Printed Tools',
        generated_with: 'SOLIDWORKS',
        ticket_no: "41",
        fallback_value: "16,180.00",
        skills_used: ['CAD', '3D Printing'],
        image: '/3d_tools/3d_card.png',
        page_image_one: '/models/keyassembly03.glb',
        page_image_two: '/models/remoteholder.glb',
        github_link: 'https://github.com/chieaid24/Design_Portfolio/tree/main/SOLIDWORKS/BUILD%20PICS',
        subtitle: "where form meets functional",
        summary: <>A messy and unorganized workspace is both <RedText rewardId="red:tools:unprofessional">unprofessional</RedText> and <RedText rewardId="red:tools:inefficient">inefficient</RedText>. Keep reading to find out how I solved problems while creating <RedText rewardId="red:tools:conversation-pieces">conversation pieces</RedText> for the office!</>,
        tool_paragraphs: [
            <>
                I designed everything in <RedText rewardId="red:tools:solidworks">SOLIDWORKS</RedText> and printed with the Markforged software, on FDM carbon-fiber reinforced filaments. I also sanded and spray painted when necessary.
            </>,
        ],
        why_paragraphs: [
            <>
                Looking around my office workspace, I felt an urge to make everything as efficient as possible—and that meant it had to be organized. Firstly, I saw that we had a pile of assorted keys that just sat on a desk, and three remotes that were scattered across the conference room table. There was no good way to store or organize these objects, so they had to be strewn around or, at best, lined up in a neat row. Seeing this, I realized something had to change.
            </>,
        ],
        what_paragraphs: [
            <>
                Regarding my keyholder, it is composed of four unique parts: a base, a top and bottom half of the structure, and the key holders themselves. In my design process, there were many printer considerations that I had to make, such as by hollowing out the base or splitting the main structure to fit into the printer&apos;s constraints. After designing in SOLIDWORKS, and using Markforged&apos;s proprietary printing software, Eiger, they came out of the printer with both additive and subtractive deformities. I realized that this was part of the printing process however, and was determined to make do with what I had. I used a combination of dry and wet sandpaper to sand the piece down as best I could, and then used a black spray paint to cover up the imperfections. Lastly, I super glued the component parts together to finish the project.
            </>,
            <>
                For the remote holder, I created the ergonomic and accessible design by taking measurements directly from the remotes. The design is made up of a main piece that holds a flat Logitech camera controller and two side pieces that hold identical TV remotes. I added left and right (L and R) indicators for each of the remotes, as well as a company logo to the base pad for extra customization. Building off of my keyholder project, I created a keyed joint attachment system for the sides to the base. This meant that it didn&apos;t require super glue, and could easily be disassembled while maintaining structural stability during use.
            </>,
        ],

        learning_paragraphs: [
            <>
                In the design process, incorporating <RedText rewardId="red:tools:ux-considerations">UX considerations</RedText> and real-life measurements allowed me to create ergonomic yet functional pieces for the workspace. Additionally, I designed for manufacturability by putting into account possible manufacturing failure and ensuring ease of printing. All in all, I was able to quickly and elegantly solve a physical problem in my office, while reinforcing my team&apos;s brand identity.
            </>,
        ],
    },
    {
        slug: 'mbd-macro',
        title: 'MBD Macro',
        generated_with: 'AUTOHOTKEY',
        ticket_no: "94",
        fallback_value: "17,270.00",
        skills_used: ['Workflow Optimization', 'Machining'],
        image: '/mbd_macro/mbd_card.png',
        page_image_one: '/mbd_macro/mbd_card.png',
        github_link: 'https://github.com/chieaid24/MBD-Macro',
        subtitle: "streamlining software to your workflow",
        summary: <>Being a machinist requires you to <RedText rewardId="red:mbd:spend-hours">spend hours</RedText> annotating and processing every part that comes through the shop. I built an app that increases your efficiency by <RedText rewardId="red:mbd:100%">up to 100%</RedText>—keep scrolling to learn more!</>,
        tool_paragraphs: [
            <>The script is built in <RedText rewardId="red:mbd:ahk">AutoHotKey</RedText>, a <RedText rewardId="red:mbd:cpp">C++</RedText> based scripting language for easy interfacing with applications, and built for Capvidia&apos;s <RedText rewardId="red:mbd:mbdvidia">MBDVidia</RedText>.</>,
        ],
        why_paragraphs: [
            <>
                For every part that comes through a machine shop, skilled machinists need a three-dimensionally annotated model, meaning a 3D model whose features include dimension and tolerance information embedded in the file itself. Many times, the machinists aren&apos;t sent this file, but instead a stripped 3D model (with no annotations) and a PDF part drawing with the desired specification.
            </>,
            <>
                Every time, someone must transfer the information from the PDF to the model using an MBD (Model Based Definition) software, like MBDVidia. I was tasked with doing this at first, and after a few hours, I realized how repetitive the actions I was taking were. For 90% of the annotations, the process would be exactly the same, and navigating the slightly clunky software made it even more tedious. So I decided to create a macro application that would automate repeated button presses and mouse clicks for our exact workflow.
            </>,
        ],
        what_paragraphs: [
            <>
                This is an application that, when launched, creates a graphical overlay and event listeners on top of MBDVidia, enabling hotkey-based controls that trigger scripts, manipulate windows, and interact with <RedText rewardId="red:mbd:gui">GUI elements</RedText>. This means that previously manual and tedious processes become nearly instantaneous. This program supports the creation of dimensional and geometric tolerances by setting keybinds to common functions. To achieve this, the program uses multithreaded processing and image detection, as well as window and keyboard/mouse manipulation.
            </>,
            <>
                For example, for dimensional tolerances (tolerancing the distance between two planes), after the hotkey is pressed, the program listens for the user&apos;s inputs and when necessary, will automatically pop up a chat box, which the user can input their desired tolerance and the macro will do the rest of the work. For most dimensions, this process is <RedText rewardId="red:mbd:2-3">2 to 3 times</RedText> faster than entering the information manually, and there are failsafes to dismiss the macro when the tolerance requires more manual input. In addition, the program includes overall quality of life improvements that increase both efficiency and user experience. More information can be found on the {" "}
                <Link
                    href="https://github.com/chieaid24/MBD-Macro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition font-semibold"
                >GitHub</Link>
                , which goes through all the possible shortcuts and explanations.
            </>,
        ],

        learning_paragraphs: [
            <>
                Completing this process improved my <RedText rewardId="red:mbd:ux">user experience design</RedText> skills, as it required me to consider all possibilities, such as ease of learning (ex. UI indicators) and incorporating failsafes (ex. LOTS of error handling). Additionally, improving existing software forced me to think creatively, taking advantage of its strengths while finding workarounds for its limitations.
            </>,
        ],
    },

];

// Helper function to get project by slug
export const getProjectBySlug = (slug) => {
    return projects.find(project => project.slug === slug);
};


export default projects;
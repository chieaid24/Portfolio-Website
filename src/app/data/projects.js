const generateRandomTicketNo = () => {
    const randomNum = Math.floor(Math.random() * 99) + 1; // 1-99
    return randomNum < 10 ? `0${randomNum}` : randomNum.toString();
};



// image / second_image can also be 3D models, and will be conditionally rendered as so on the page
export const projects = [
    {
        slug: 'pmi-auto-generator',
        title: 'PMI Auto Generator',
        generated_with: 'PYTHON + AHK',
        ticket_no: generateRandomTicketNo(),
        skills_used: ['Python', 'OOP'],
        image: '/pmi_auto_generator/PMI Card2.png',
        page_image_one: '/pmi_auto_generator/pmi_card.png',
        page_image_two: '/pmi_auto_generator/pmi_card.png',
        github_link: 'https://github.com/chieaid24/PMI-Auto-Generator-Desc',
        subtitle: "a machinist's best friend",
        summary: <>Manually transferring info from a <span className="custom-bold">technical drawing</span> to a 3D <span className="custom-bold">CAD model</span> can be tedious and the worst part of a machinist's day. Keep scrolling to find out how I cut production time by <span className="custom-bold">30 percent</span>! </>,
        tool_paragraphs: [
            <>I used <span className="custom-bold">Python</span> for the logic and <span className="custom-bold">AutoHotKey</span> for easy interfacing with applications. I also utilized MBDVidia's OCR for data extraction and file conversion.</>,
        ],
        why_paragraphs: [<>Give the backstory on why this is a problem, why it hasn't been done, what did I see, etc. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</>],
        what_paragraphs: [<>Explain the project, also can link the video here as well, all capabilities, very similar to gitHub i guess</>, <>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</>],
        learning_paragraphs: [<>Explain the overarching like topics like OOP, challenges I may have faced, extensions to the project, call to action to check out the github</>,
        <>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</>
        ],
    },
    {
        slug: 'personal-website',
        title: 'Personal Website',
        generated_with: 'NEXT + TAILWIND',
        ticket_no: generateRandomTicketNo(),
        skills_used: ['React', 'Web Development', 'Full Stack Development'],
        image: '/personal_website/card_image.jpg',
        page_image_one: '/personal_website/card_image.jpg',
        github_link: 'https://github.com/chieaid24/Personal-Website',
        subtitle: "a machinist's best friend",
        summary: "Manually transferring info from a technical drawing to a 3D CAD model can be tedious and the worst part of a machinist's day. Keep scrolling to find out how I cut production time by 30 percent!",
        tool_paragraphs: [
            <>I used <span className="text-custom-red">Python</span> for the logic and <span className="text-custom-red">AutoHotKey</span> for easy interfacing with applications. I also utilized MBDVidia's OCR for data extraction and file conversion.</>,
        ],
    },
    {
        slug: '3d-tools',
        title: '3D Printed Tools',
        generated_with: 'SOLIDWORKS',
        ticket_no: generateRandomTicketNo(),
        skills_used: ['CAD', '3D Printing'],
        image: '/3d_tools/3d_card.png',
        page_image_one: '/models/keyassembly03.glb',
        page_image_two: '/models/remoteholder.glb',
        github_link: 'https://github.com/chieaid24/Design_Portfolio/tree/main/SOLIDWORKS/BUILD%20PICS',
        subtitle: "a machinist's best friend",
        summary: "Manually transferring info from a technical drawing to a 3D CAD model can be tedious and the worst part of a machinist's day. Keep scrolling to find out how I cut production time by 30 percent!",
        tool_paragraphs: [
            <>I used <span className="text-custom-red">Python</span> for the logic and <span className="text-custom-red">AutoHotKey</span> for easy interfacing with applications. I also utilized MBDVidia's OCR for data extraction and file conversion.</>,
        ],
    },
    {
        slug: 'mbd-macro',
        title: 'MBD Macro',
        generated_with: 'AUTOHOTKEY',
        ticket_no: generateRandomTicketNo(),
        skills_used: ['Workflow Optimization', 'Machining'],
        image: '/mbd_macro/mbd_card.png',
        page_image_one: '/mbd_macro/mbd_card.png',
        github_link: 'https://github.com/chieaid24/MBD-Macro',
        subtitle: "a machinist's best friend",
        summary: "Manually transferring info from a technical drawing to a 3D CAD model can be tedious and the worst part of a machinist's day. Keep scrolling to find out how I cut production time by 30 percent!",
        tool_paragraphs: [
            <>I used <span className="text-custom-red">Python</span> for the logic and <span className="text-custom-red">AutoHotKey</span> for easy interfacing with applications. I also utilized MBDVidia's OCR for data extraction and file conversion.</>,
        ],
    },
];

// Helper function to get project by slug
export const getProjectBySlug = (slug) => {
    return projects.find(project => project.slug === slug);
};


export default projects;
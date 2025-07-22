const generateRandomTicketNo = () => {
    const randomNum = Math.floor(Math.random() * 99) + 1; // 1-99
    return randomNum < 10 ? `0${randomNum}` : randomNum.toString();
};

export const projects = [
    {
        slug: 'pmi-auto-generator',
        title: 'PMI Auto Generator',
        generated_with: 'PYTHON + AHK',
        ticket_no: generateRandomTicketNo(),
        skills_used: ['Python', 'OOP'],
        image: '/pmi_auto_generator/pmi_card.png',
        subtitle: "a machinist's best friend",
        summary: "Manually transferring info from a technical drawing to a 3D CAD model can be tedious and the worst part of a machinist's day. Keep scrolling to find out how I cut production time by 30 percent!",
        tool_paragraphs: [
            <>I used <span className="text-custom-red">Python</span> for the logic and <span className="text-custom-red">AutoHotKey</span> for easy interfacing with applications. I also utilized MBDVidia's OCR for data extraction and file conversion.</>,
        ],
    },
    {
        slug: 'personal-website',
        title: 'Personal Website',
        generated_with: 'NEXT + TAILWIND',
        ticket_no: generateRandomTicketNo(),
        skills_used: ['React', 'Web Development', 'Full Stack Development'],
        image: '/personal_website/card_image.jpg',
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
        subtitle: "a machinist's best friend",
        summary: "Manually transferring info from a technical drawing to a 3D CAD model can be tedious and the worst part of a machinist's day. Keep scrolling to find out how I cut production time by 30 percent!",
        tool_paragraphs: [
            <>I used <span className="text-custom-red">Python</span> for the logic and <span className="text-custom-red">AutoHotKey</span> for easy interfacing with applications. I also utilized MBDVidia's OCR for data extraction and file conversion.</>,
        ],
    },
];

export default projects;
export const projects = [
    {
        slug: 'pmi-auto-generator',
        title: 'PMI Auto Generator',
        generated_with: 'PYTHON + AHK',
        ticket_no: '82',
        skills_used: ['Python', 'OOP'],
        image: '/pmi_auto_generator/pmi_card.png',
        subtitle: "a machinist's best friend",
        summary: "Manually transferring info from a technical drawing to a 3D CAD model can be tedious and the worst part of a machinist's day. Keep scrolling to find out how I cut production time by 30 percent!",
        tool_paragraphs: [
            <>I used <span className="text-custom-red">Python</span> for the logic and <span className="text-custom-red">AutoHotKey</span> for easy interfacing with applications. I also utilized MBDVidia's OCR for data extraction and file conversion.</>,
        ],
    },
];

export default projects;
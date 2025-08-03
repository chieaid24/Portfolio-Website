
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectBySlug, projects } from '../../data/projects';
import Header from '../../components/Header';
import MaxWidthWrapper from '../../components/MaxWidthWrapper';
import Footer from '../../components/Footer';
import BackToProjects from '../../components/BackToProjects';
import ModelSection from '../../components/ModelSection';

// Generate static params for all projects (optional, for static generation)
export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

// Generate metadata for each project page
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    return {
        title: `${project.title}`,
        description: project.summary,
    };
}

// Template function to render paragraphs
const renderParagraphs = (paragraphs) => {
    if (!paragraphs || paragraphs.length === 0) {
        return null;
    }

    // Handle both single elements and arrays
    const paragraphArray = Array.isArray(paragraphs) ? paragraphs : [paragraphs];

    return paragraphArray.map((paragraph, index) => (
        <p key={index} className="text-2xl font-regular mb-6">
            {paragraph}
        </p>
    ));
};

// Helper function to check if file is a .glb model
const isGLBFile = (filePath) => {
    return filePath && filePath.toLowerCase().endsWith('.glb');
};


export default function ProjectPage({ params }) {
    const project = getProjectBySlug(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <>
            <div className="bg-background-light font-dm-sans text-dark-grey-text min-h-screen">
                <Header />
                <MaxWidthWrapper>
                    <div className="pt-18 pb-15">
                        {/* Project header */}
                        <div className="mb-20">
                            <div className="flex justify-between items-center overflow-visible">
                                <div>
                                    <h1 className="font-black text-7xl">
                                        {project.title}
                                    </h1>
                                    <h3 className="italic text-3xl text-card-light-grey">
                                        '{project.subtitle}'
                                    </h3>
                                </div>
                                <Link href={project.github_link} target="_blank" className="mt-[-40px]">
                                    <Image
                                        src="/icons/Github_red.svg"
                                        width={100}
                                        height={100}
                                        className=""
                                        alt="Github logo" />
                                </Link>
                            </div>
                        </div>
                        {/**Summary text */}
                        <p className="text-2xl font-regular mb-15">
                            {project.summary}
                        </p>

                        {/* Project image - conditionally render 3D model or regular image */}
                        <div className="mb-15">
                            {isGLBFile(project.page_image_one) ? (
                                <ModelSection modelPath={project.page_image_one} />
                            ) : (
                                <div className="relative w-full h-100 aspect-[16/10] rounded-lg overflow-hidden shadow-lg">
                                    <Image
                                        src={project.page_image_one}
                                        alt={project.title}
                                        fill
                                        className="object-cover scale-110"
                                    />
                                </div>
                            )}
                        </div>


                        {/* Tools Used Section */}
                        <div className="mb-20">
                            <h1 className="font-bold text-5xl mb-15">
                                What Tools?
                            </h1>
                            <div className='text-2xl font-regular'>
                                {renderParagraphs(project.tool_paragraphs)}
                            </div>
                        </div>

                        {/** Why This Project */}
                        <div className="mb-15">
                            <h1 className="font-bold text-5xl mb-15">
                                Why This Project?
                            </h1>
                            <div className='text-2xl font-regular'>
                                {renderParagraphs(project.why_paragraphs)}
                            </div>
                        </div>

                        {/**optional second image - conditionally render 3D model or regular image */}
                        {project.page_image_two && (
                            <div className="mb-15">
                                {isGLBFile(project.page_image_two) ? (
                                    <ModelSection modelPath={project.page_image_two} />
                                ) : (
                                    <div className="relative w-full h-100 aspect-[16/10] rounded-lg overflow-hidden shadow-lg">
                                        <Image
                                            src={project.page_image_two}
                                            alt={project.title}
                                            fill
                                            className="object-cover scale-110"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/**What is it */}
                        <div className="mb-20">
                            <h1 className="font-bold text-5xl mb-15">
                                What is it?
                            </h1>
                            <div className='text-2xl font-regular'>
                                {renderParagraphs(project.what_paragraphs)}
                            </div>
                        </div>

                        {/**what did I learn */}
                        <div>
                            <h1 className="font-bold text-5xl mb-15">
                                What did I learn?
                            </h1>
                            <div className='text-2xl font-regular'>
                                {renderParagraphs(project.learning_paragraphs)}
                            </div>
                        </div>
                        {/* Back to Projects Button */}
                        <div className="mt-20">
                            <BackToProjects />
                        </div>
                    </div>
                </MaxWidthWrapper >
            </div >
            <Footer />
        </>
    );
}
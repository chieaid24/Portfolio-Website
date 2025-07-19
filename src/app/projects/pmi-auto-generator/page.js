import { projects } from '../../data/projects';
import ProjectLayout from '../../components/ProjectLayout';

export default function ProjectPage({ params }) {
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    return <div className="text-center text-red-500 p-12">Project not found</div>;
  }

  return <ProjectLayout title={project.title}/>;
}
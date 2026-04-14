import { useState } from 'react';
import { mockProjects } from '../utils/mockData';
import type { Project } from '../utils/mockData';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';

type FilterValue = 'all' | Project['status'];

function ProjectListContainer() {
    const [project] = useState<Project[]>(mockProjects);
    const [filter, setFilter] = useState<FilterValue>('all');
    const filteredProjects = filter === 'all'
        ? project
        : project.filter(t => t.status === filter);
    const projectCount = {
        total: project.length,
        filtered: filteredProjects.length,
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0 }}>Proyectos ({projectCount.filtered}/{projectCount.total})</h2>
            </div>
            <ProjectFilters current={filter} onChange={setFilter} />
                {filteredProjects.length === 0 ? (
                <p style={{ color: '#94a3b8', textAlign: 'center',
                padding: '32px' }}>
                No hay projectos con este filtro.
                </p>
                ) : (
                filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
                ))
            )}
        </div>
    );
}

export default ProjectListContainer;
import { useState, useMemo } from 'react';
import { mockProjects } from '../utils/mockData';
import type { Project } from '../utils/mockData';
import { ProjectCard } from './ProjectCard';
import { ProjectFilters } from './ProjectFilters';

type FilterValue = 'all' | Project['status'];

export function ProjectListContainer() {
    const [project] = useState<Project[]>(mockProjects);
    const [filter, setFilter] = useState<FilterValue>('all');

    const filteredProjects = useMemo(
        () => (filter === 'all'
        ? project
        : project.filter(t => t.status === filter)),
        [filter, project],
    );

    const totalCount = useMemo(() => project.length, [project]);
    const filteredCount = useMemo(() => filteredProjects.length, [filteredProjects]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0 }}>Proyectos ({filteredCount}/{totalCount})</h2>
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
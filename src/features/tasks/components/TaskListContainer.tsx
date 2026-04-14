import { useState } from 'react';
import { mockTasks } from '../utils/mockData';
import type { Task } from '../utils/mockData';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';

type FilterValue = 'all' | Task['status'];

function TaskListContainer() {
    const [tasks] = useState<Task[]>(mockTasks);
    const [filter, setFilter] = useState<FilterValue>('all');
    const filteredTasks = filter === 'all'
        ? tasks
        : tasks.filter(t => t.status === filter);
    const taskCount = {
        total: tasks.length,
        filtered: filteredTasks.length,
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h2 style={{ margin: 0 }}>Tareas ({taskCount.filtered}/{taskCount.total})</h2>
            </div>
            <TaskFilters current={filter} onChange={setFilter} />
                {filteredTasks.length === 0 ? (
                <p style={{ color: '#94a3b8', textAlign: 'center',
                padding: '32px' }}>
                No hay tareas con este filtro.
                </p>
                ) : (
                filteredTasks.map(task => (
                <TaskCard key={task.id} task={task} />
                ))
            )}
        </div>
    );
}

export default TaskListContainer;
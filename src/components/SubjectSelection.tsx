import React from 'react';
import { Link } from 'react-router-dom';
import MiniDrawer from './drawer';

const SubjectSelection = () => {
    const subjects = [
        { name: 'Matemáticas', schedules: ['Lunes 8:00 - 10:00', 'Miércoles 8:00 - 10:00'] },
        { name: 'Ciencias', schedules: ['Martes 9:00 - 11:00', 'Jueves 9:00 - 11:00'] },
        { name: 'Historia', schedules: ['Lunes 10:30 - 12:30', 'Miércoles 10:30 - 12:30'] },
        { name: 'Literatura', schedules: ['Martes 14:00 - 16:00', 'Jueves 14:00 - 16:00'] }
    ];

    return (
        <div>
            <h2>Selecciona una asignatura:</h2>
            <MiniDrawer />
            <ul>
                {subjects.map((subject, index) => (
                    <li key={index}>
                        <Link to={{
                            pathname: `/datagrid/${subject.name}`,
                            state: { schedules: subject.schedules }
                        }}>{subject.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SubjectSelection;
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CustomerProfile() {
    const [data, setData] = useState({ points: 0 });

    useEffect(() => {
        // Asumiendo que guardaste el email al loguear
        const email = localStorage.getItem('userEmail');
        axios.get(`/api/points/${email}`).then(res => setData(res.data));
    }, []);

    return (
        <div className="p-4 bg-white shadow rounded">
            <h3>Mi Panel de Cliente</h3>
            <p>Puntos acumulados: <strong>{data.points}</strong></p>
        </div>
    );
}
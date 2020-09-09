import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';

import api from '../../services/api';

import './styles.css';
import { request } from 'https';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id },
    }), [user_id]);

    useEffect(() => {

        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    }, [requests, socket]);


    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            
            setSpots(response.data);
        }


        loadSpots();

    }, []);

    return (
    <>
        <ul className="notifications">
            {requests.map(request => (
                <li key={requests._id}>
                    <p>
                        <strong>{requests.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                    </p>
                    <button>ACEITAR</button>
                    <button>Rejeitar!!!</button>
                </li>
            ))}
        </ul>

        <ul className="spot-list">
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={ { backgroundImage: `url(${spot.thumbnail_url})` } } />
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                </li>
            ))}
        </ul>

                <Link to="/new">
                    <button className="btn">Cadastrar novo spot</button>
                </Link>

    </>
    )
}
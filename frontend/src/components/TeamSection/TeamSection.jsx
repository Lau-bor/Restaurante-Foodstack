import { useState } from 'react';
import './TeamSection.css'; 

const teamMembers = [
    { id: 1, name: 'Lautaro', position: 'Scrum Master', photo: '/lautaro.jpg' },
    { id: 2, name: 'Ivan', position: 'Developer', photo: '/ivan.jpg' },
    { id: 3, name: 'Tomas', position: 'Developer', photo: '/tomy.jpg' },
    { id: 4, name: 'Rocio', position: 'Developer', photo: '/rocio.jpg' },
    { id: 5, name: 'Matias', position: 'Developer', photo: '/mati.jpg' },
];

function TeamSection() {
    const [hoveredCard, setHoveredCard] = useState(null);

    
    const topRowMembers = teamMembers.slice(0, 3);
    const bottomRowMembers = teamMembers.slice(3, 5);

    const renderCard = (member) => (
        <div className="col-lg-4 col-md-6 mb-4 d-flex" key={member.id}>
            <div 
                className="card team-card w-100" 
                onMouseEnter={() => setHoveredCard(member.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ 
                    transform: hoveredCard === member.id ? 'translateY(-10px)' : 'translateY(0)' 
                }}
            >
                <img 
                    src={member.photo} 
                    className="card-img-top team-member-img" 
                    alt={`Foto de ${member.name}`} 
                />
                <div className="card-body">
                    <h5 className="card-title team-member-name">{member.name}</h5>
                    <p className="card-text team-member-position">{member.position}</p>
                </div>
            </div>
        </div>
    );

    return (
        <section className="container team-section text-center py-5">
            <h2 className='text-center mb-5 text-uppercase fw-bold fs-1'>Conoce a nuestro equipo</h2>
            <div className="row">
                {topRowMembers.map(member => renderCard(member))}
            </div>
            <div className="row justify-content-center">
                {bottomRowMembers.map(member => renderCard(member))}
            </div>
        </section>
    );
}

export default TeamSection;
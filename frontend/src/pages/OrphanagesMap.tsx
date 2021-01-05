import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import '../styles/pages/orphanages-map.css';
import mapMarkerImg from '../assets/images/map-marker.svg'; 
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import { LeafletMouseEvent } from 'leaflet';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrpahagesMaps(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]); 
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Palmas</strong>
                    <span>Tocantins</span>
                </footer>
            </aside>

            <Map 
                center={[-10.2114428,-48.3438468]}
                zoom={15}
                style={{ width: '100%', height: '100%'}}
            >
                <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                {orphanages.map(orphanage => {
                    return(

                    
                        <Marker
                            key={orphanage.id}
                            icon={mapIcon} 
                            position={[orphanage.latitude,orphanage.longitude]}
                        > 
                            <Popup 
                                closeButton={false}
                                minWidth={240}
                                maxWidth={240}
                                className="map-popup"
                            >
                                {orphanage.name}
                                <Link to={`orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF"/>
                                </Link>
                            </Popup>
                    
                        </Marker>
                    )
                })}
               
                
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus  size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrpahagesMaps;
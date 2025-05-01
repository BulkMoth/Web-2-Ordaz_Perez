import { useContext, useEffect, useState } from 'react';
import { LikeContext } from '../contexts/LikeContext';
import { Link } from 'react-router-dom';
import '../styles/EpisodeList.css';

const EpisodeList = ({ episodes }) => {
  const { likes, toggleLike } = useContext(LikeContext);
  const [episodeImages, setEpisodeImages] = useState({});

  useEffect(() => {
    const fetchEpisodeImages = async () => {
      const images = {};
      for (const episode of episodes) {
        if (episode.characters.length > 0) {
          const characterResponse = await fetch(episode.characters[0]);
          const characterData = await characterResponse.json();
          images[episode.id] = characterData.image; // Usar la imagen del primer personaje
        }
      }
      setEpisodeImages(images);
    };

    fetchEpisodeImages();
  }, [episodes]);

  return (
    <div className="episode-grid">
      {episodes.map((episode) => (
        <div key={episode.id} className="episode-card">
          {episodeImages[episode.id] && (
            <img src={episodeImages[episode.id]} alt={episode.name} className="episode-image" />
          )}
          <h3>{episode.name}</h3>
          <p>Fecha de estreno: {episode.air_date}</p>
          <button onClick={() => toggleLike(episode.id)}>
            {likes[episode.id] ? 'Quitar Like' : 'Dar Like'}
          </button>
          <p>Likes: {likes[episode.id] ? 1 : 0}</p>
          <Link to={`/episodio/${episode.id}`} className="details-link">
            Ver detalles
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EpisodeList;


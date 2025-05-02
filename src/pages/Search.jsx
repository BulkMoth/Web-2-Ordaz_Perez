import { useState } from 'react';
import SearchForm from './SearchForm';
import CharacterList from './CharacterList';

const Search = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    const query = Object.entries(filters)
      .filter(([_, value]) => value) // Filtra los campos vacíos
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?${query}`);
      const data = await response.json();
      setCharacters(data.results || []); // Maneja resultados vacíos
    } catch (error) {
      console.error('Error al buscar personajes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Buscar Personajes</h1>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <CharacterList characters={characters} />
      )}
    </div>
  );
};

export default Search;


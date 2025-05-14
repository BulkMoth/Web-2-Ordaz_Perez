import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMealDetails } from '../services/api';

export default function RecipeDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    getMealDetails(id).then(data => setMeal(data.meals[0]));
  }, [id]);

  if (!meal) return <p style={{ padding: '2rem' }}>Cargando receta...</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const meas = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push(`${meas} ${ing}`);
    }
  }

  return (
    <div className="detail-page">
      <div className="recipe-header">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="recipe-img" />
        <div className="recipe-info">
          <h1>{meal.strMeal}</h1>
          <p className="category">Categoría: <strong>{meal.strCategory}</strong></p>
          <p className="area">Origen: <strong>{meal.strArea}</strong></p>
          {meal.strYoutube && (
            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="youtube-btn">
              Ver video en YouTube 🎥
            </a>
          )}
        </div>
      </div>

      <div className="recipe-content">
        <h3>🧾 Instrucciones</h3>
        <p>{meal.strInstructions}</p>

        <h3>🥄 Ingredientes</h3>
        <ul className="ingredients-list">
          {ingredients.map((item, index) => (
            <li key={index}>✔️ {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

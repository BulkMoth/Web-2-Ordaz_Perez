import { useEffect, useState } from 'react';
import { getCategories, getMealsByCategory } from '../services/api';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState('Seafood');
  const [meals, setMeals] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    getCategories().then(data => setCategories(data.categories));
  }, []);

  useEffect(() => {
    getMealsByCategory(selected).then(data => {
      const sorted = [...data.meals].sort((a, b) => {
        return sortOrder === 'asc'
          ? a.strMeal.localeCompare(b.strMeal)
          : b.strMeal.localeCompare(a.strMeal);
      });
      setMeals(sorted);
    });
  }, [selected, sortOrder]);

  return (
    <div>
      <Header />
      <div className="filters">
        <select onChange={e => setSelected(e.target.value)} value={selected}>
          {categories.map(cat => (
            <option key={cat.idCategory} value={cat.strCategory}>
              {cat.strCategory}
            </option>
          ))}
        </select>

        <select onChange={e => setSortOrder(e.target.value)} value={sortOrder}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      <div className="grid">
        {meals.map(meal => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import MealItem from './MealItem';
import Spinner from './Spinner';


function Meals() {
    const [loadMeals, setLoadMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMeals() {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/meals");
                if (!response.ok) {
                    throw new Error("Failed to fetch meals. Please try again.");
                }
                const data = await response.json();
                setLoadMeals(data);
                setError(null);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMeals();
    }, []);

    const handleRetry = () => {
        setError(null);
        setLoading(true);
        fetchMeals();  
    };

    return (
        <div className="meals-container">
            {loading && <Spinner />}
            {error && (
                <div className="error-message">
                    <p style={{ color: "red" }}>{error}</p>
                    <button className="retry-button" onClick={handleRetry}>
                        Retry
                    </button>
                </div>
            )}
            {!loading && !error && (
                <div className="meals-list">
                    <ul id="meals">
                        {loadMeals.length > 0 ? (
                            loadMeals.map((meal) => (
                                <MealItem key={meal.id} meal={meal} />
                            ))
                        ) : (
                            <p className="empty-state">No meals available at the moment. Please check back later!</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Meals;

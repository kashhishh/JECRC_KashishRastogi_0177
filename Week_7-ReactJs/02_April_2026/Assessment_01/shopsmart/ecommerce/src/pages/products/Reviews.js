import { useOutletContext } from 'react-router-dom';
import './Products.css';

const Reviews = () => {
  const context = useOutletContext();
  const productName = context?.productName || 'This Product';

  const reviews = [
    {
      id: 1,
      author: 'John Doe',
      rating: 5,
      date: '2024-03-20',
      comment: 'Excellent product! Highly recommended.'
    },
    {
      id: 2,
      author: 'Jane Smith',
      rating: 4,
      date: '2024-03-15',
      comment: 'Good quality, decent price. Very satisfied.'
    },
    {
      id: 3,
      author: 'Mike Johnson',
      rating: 5,
      date: '2024-03-10',
      comment: 'Perfect! Works as described. Great value for money.'
    },
  ];

  return (
    <div className="reviews-section">
      <h2>Customer Reviews</h2>

      <div className="review-summary">
        <div className="rating-display">
          <span className="rate-number">4.7</span>
          <div className="stars">★★★★★</div>
          <p>Based on 147 reviews</p>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <h4>{review.author}</h4>
              <span className="review-date">{review.date}</span>
            </div>
            <div className="review-rating">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <p className="review-text">{review.comment}</p>
          </div>
        ))}
      </div>

      <button className="write-review-btn">Write a Review</button>
    </div>
  );
};

export default Reviews;

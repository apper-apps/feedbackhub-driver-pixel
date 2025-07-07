import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';
import Header from '@/components/organisms/Header';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { reviewService } from '@/services/api/reviewService';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reviewService.getAll();
      setReviews(data);
    } catch (err) {
      setError('Failed to load reviews');
      console.error('Reviews error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <ApperIcon
        key={i}
        name="Star"
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'accent';
    if (rating >= 3) return 'planned';
    if (rating >= 2) return 'in-progress';
    return 'danger';
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Reviews" subtitle="Customer feedback and ratings" />
        <div className="flex-1 p-6">
          <Loading type="cards" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <Header title="Reviews" subtitle="Customer feedback and ratings" />
        <div className="flex-1 p-6">
          <Error 
            title="Failed to load reviews"
            message={error}
            onRetry={loadReviews}
          />
        </div>
      </div>
    );
  }

  const avgRating = getAverageRating();
  const ratingDistribution = getRatingDistribution();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Header title="Reviews" subtitle="Customer feedback and ratings" />
      
      <div className="flex-1 p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {reviews.length === 0 ? (
            <Empty
              title="No reviews yet"
              message="Customer reviews will appear here once they start rating your product."
              icon="Star"
            />
          ) : (
            <>
              {/* Rating Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Overall Rating
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold text-gray-900">
                      {avgRating}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1 mb-1">
                        {renderStars(Math.round(avgRating))}
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on {reviews.length} reviews
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="card p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Rating Distribution
                  </h3>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 w-4">
                          {rating}
                        </span>
                        <ApperIcon name="Star" className="w-3 h-3 text-yellow-400" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{
                              width: `${reviews.length > 0 ? (ratingDistribution[rating] / reviews.length) * 100 : 0}%`
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-6">
                          {ratingDistribution[rating]}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Customer Reviews
                </h3>
                
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.Id}
                    className="card p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {review.customerName?.charAt(0) || '?'}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {review.customerName || 'Anonymous'}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating)}
                            </div>
                            <Badge variant={getRatingColor(review.rating)} size="sm">
                              {review.rating}/5
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <ApperIcon name="Clock" className="w-3 h-3" />
                        <span>
                          {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Reviews;
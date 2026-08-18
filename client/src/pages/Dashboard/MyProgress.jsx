import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProgress } from '../../store/dataSlice';
import { Target, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const MyProgress = () => {
  const dispatch = useDispatch();
  const { progressHistory, isLoading } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchProgress());
  }, [dispatch]);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="clay-card h-full p-6 overflow-y-auto">
      <div className="flex items-center space-x-3 mb-8">
        <Target className="text-primary" size={28} />
        <h2 className="text-3xl font-bold text-primary font-['Outfit']">My Progress History</h2>
      </div>

      <div className="space-y-4">
        {progressHistory.length === 0 ? (
          <div className="text-center p-8 text-gray-500 bg-white/50 rounded-clay">
            You haven't completed any levels yet. Go to the dashboard and start your first challenge!
          </div>
        ) : (
          progressHistory.map((prog) => (
            <div key={prog._id} className="clay-card p-4 flex justify-between items-center bg-white/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Level {prog.level}</h4>
                  <p className="text-sm text-gray-500">
                    Completed on {prog.completedAt ? format(new Date(prog.completedAt), 'MMM dd, yyyy') : 'Unknown'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary text-xl">{prog.score} / 100</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyProgress;

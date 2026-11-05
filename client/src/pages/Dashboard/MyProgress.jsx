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
    <div className="clay-card h-full p-4 sm:p-6 overflow-y-auto">
      <div className="flex items-center space-x-3 mb-5 sm:mb-8">
        <Target className="text-primary shrink-0" size={26} />
        <h2 className="text-2xl sm:text-3xl font-bold text-primary font-['Outfit']">My Progress History</h2>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {progressHistory.length === 0 ? (
          <div className="text-center p-6 sm:p-8 text-gray-500 bg-white/50 rounded-clay text-sm sm:text-base">
            You haven't completed any levels yet. Go to the dashboard and start your first challenge!
          </div>
        ) : (
          progressHistory.map((prog) => (
            <div key={prog._id} className="clay-card p-3 sm:p-4 flex justify-between items-center bg-white/50 gap-2">
              <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-success/10 flex items-center justify-center text-success shrink-0">
                  <CheckCircle size={22} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-base sm:text-lg">Level {prog.level}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {prog.completedAt ? format(new Date(prog.completedAt), 'MMM dd, yyyy') : 'Unknown'}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-bold text-primary text-lg sm:text-xl">{prog.score} / 100</div>
                <div className="text-[11px] sm:text-xs text-gray-500">Score</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyProgress;

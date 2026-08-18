import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProgress } from '../../store/dataSlice';
import SkillTree from '../../components/SkillTree';
import QuestionEngine from '../../components/QuestionEngine';

const SkillTreePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { progressHistory } = useSelector((state) => state.data);
  const [activeLevel, setActiveLevel] = useState(null);

  useEffect(() => {
    dispatch(fetchProgress());
  }, [dispatch]);

  const handleStartLevel = (levelId) => {
    setActiveLevel(levelId);
  };

  const handleLevelComplete = () => {
    setActiveLevel(null);
  };

  if (activeLevel) {
    return <QuestionEngine level={activeLevel} onComplete={handleLevelComplete} onBack={() => setActiveLevel(null)} />;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-primary mb-4 text-center z-10 font-['Outfit'] absolute top-4 left-0 right-0 pointer-events-none">Knowledge Tree</h2>
      <SkillTree onNodeClick={handleStartLevel} userLevel={user.currentLevel} progressHistory={progressHistory} />
    </>
  );
};

export default SkillTreePage;

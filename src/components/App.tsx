import 'modern-normalize';
import css from '../styles/App.module.css';
import CafeInfo from './CafeInfo.tsx';
import type { VoteType, Votes } from '../types/votes.ts';
import { useState } from 'react';
import VoteOptions from './VoteOptions.tsx';
import VoteStats from './VoteStats.tsx';
import Notification from './Notification.tsx';

function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVotes(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const hasVotes = totalVotes > 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={votes.good > 0 || votes.neutral > 0 || votes.bad > 0}
      />
      {!hasVotes ? (
        <Notification />
      ) : (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={(votes.good / totalVotes) * 100 || 0}
        />
      )}
    </div>
  );
}

export default App;

const REGEN_INTERVAL_MS = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

/**
 * Regenerates hearts for a user based on elapsed time (1 heart every 4 hours).
 * Mutates user object in-place.
 */
const updateUserHearts = (user) => {
  if (user.isPro) {
    user.hearts = 5;
    return { nextHeartInSeconds: 0 };
  }

  if (typeof user.hearts !== 'number') {
    user.hearts = 5;
  }
  if (!user.lastHeartRegen) {
    user.lastHeartRegen = new Date();
  }

  const now = Date.now();
  const lastRegen = new Date(user.lastHeartRegen).getTime();

  if (user.hearts < 5) {
    const elapsed = now - lastRegen;
    const heartsEarned = Math.floor(elapsed / REGEN_INTERVAL_MS);

    if (heartsEarned > 0) {
      user.hearts = Math.min(5, user.hearts + heartsEarned);
      if (user.hearts >= 5) {
        user.lastHeartRegen = new Date(now);
      } else {
        user.lastHeartRegen = new Date(lastRegen + heartsEarned * REGEN_INTERVAL_MS);
      }
    }
  }

  let nextHeartInSeconds = 0;
  if (user.hearts < 5) {
    const elapsedSinceLast = now - new Date(user.lastHeartRegen).getTime();
    const remainder = REGEN_INTERVAL_MS - elapsedSinceLast;
    nextHeartInSeconds = Math.max(0, Math.ceil(remainder / 1000));
  }

  return { nextHeartInSeconds };
};

const isDoubleXpActive = (user) => {
  return Boolean(user.doubleXpUntil && new Date(user.doubleXpUntil) > new Date());
};

const doubleXpSecondsLeft = (user) => {
  if (!user.doubleXpUntil) return 0;
  const diff = new Date(user.doubleXpUntil).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 1000));
};

const getEconomyProfile = (user) => {
  const { nextHeartInSeconds } = updateUserHearts(user);
  return {
    _id: user._id,
    username: user.username,
    xp: user.xp,
    currentLevel: user.currentLevel,
    streak: user.streak,
    isAdmin: user.isAdmin,
    hearts: user.hearts ?? 5,
    maxHearts: 5,
    nextHeartInSeconds,
    gems: user.gems ?? 100,
    isPro: Boolean(user.isPro),
    streakFreezes: user.streakFreezes ?? 0,
    isDoubleXpActive: isDoubleXpActive(user),
    doubleXpSecondsLeft: doubleXpSecondsLeft(user)
  };
};

module.exports = {
  REGEN_INTERVAL_MS,
  updateUserHearts,
  isDoubleXpActive,
  doubleXpSecondsLeft,
  getEconomyProfile
};

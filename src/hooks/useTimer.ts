import { useState, useEffect, useCallback, useRef } from 'react';
import type { TimerState } from '../types';

interface UseTimerOptions {
  onComplete?: () => void;
  onTick?: (secondsRemaining: number) => void;
}

export const useTimer = (options: UseTimerOptions = {}) => {
  const [timerState, setTimerState] = useState<TimerState>({
    status: 'idle',
    remainingSeconds: 0,
    totalSeconds: 0,
    sessionType: 'focus',
  });

  const intervalRef = useRef<number | null>(null);
  const { onComplete, onTick } = options;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback((durationMinutes: number, sessionType: 'focus' | 'break' | 'longBreak' = 'focus') => {
    clearTimer();
    const totalSeconds = durationMinutes * 60;

    setTimerState({
      status: 'running',
      remainingSeconds: totalSeconds,
      totalSeconds,
      sessionType,
    });

    intervalRef.current = window.setInterval(() => {
      setTimerState((prev) => {
        if (prev.remainingSeconds <= 1) {
          clearTimer();
          if (onComplete) onComplete();
          return {
            ...prev,
            status: 'completed',
            remainingSeconds: 0,
          };
        }

        const newRemaining = prev.remainingSeconds - 1;
        if (onTick) onTick(newRemaining);

        return {
          ...prev,
          remainingSeconds: newRemaining,
        };
      });
    }, 1000);
  }, [clearTimer, onComplete, onTick]);

  const pause = useCallback(() => {
    clearTimer();
    setTimerState((prev) => ({
      ...prev,
      status: 'paused',
    }));
  }, [clearTimer]);

  const resume = useCallback(() => {
    if (timerState.status !== 'paused') return;

    setTimerState((prev) => ({
      ...prev,
      status: 'running',
    }));

    intervalRef.current = window.setInterval(() => {
      setTimerState((prev) => {
        if (prev.remainingSeconds <= 1) {
          clearTimer();
          if (onComplete) onComplete();
          return {
            ...prev,
            status: 'completed',
            remainingSeconds: 0,
          };
        }

        const newRemaining = prev.remainingSeconds - 1;
        if (onTick) onTick(newRemaining);

        return {
          ...prev,
          remainingSeconds: newRemaining,
        };
      });
    }, 1000);
  }, [timerState.status, clearTimer, onComplete, onTick]);

  const stop = useCallback(() => {
    clearTimer();
    setTimerState({
      status: 'idle',
      remainingSeconds: 0,
      totalSeconds: 0,
      sessionType: 'focus',
    });
  }, [clearTimer]);

  const fail = useCallback(() => {
    clearTimer();
    setTimerState((prev) => ({
      ...prev,
      status: 'failed',
    }));
  }, [clearTimer]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  const progress = timerState.totalSeconds > 0
    ? ((timerState.totalSeconds - timerState.remainingSeconds) / timerState.totalSeconds) * 100
    : 0;

  return {
    timerState,
    start,
    pause,
    resume,
    stop,
    fail,
    progress,
  };
};

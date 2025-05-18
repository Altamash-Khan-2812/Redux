import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabits } from "../store/habit-slice";

const HabitStats = () => {
  const { habits, isLoading, error } = useSelector((state) => state.habits);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHabits());
  }, []);

  const todaysCompletedTodosLength = habits.filter((habit) => {
    const today = new Date().toISOString().split("T")[0];

    return habit.completedDates.includes(today);
  });

  function getStreak(habit) {
    let streak = 0;
    const currentDate = new Date();

    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];

      if (habit.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  const getLongestStreak = () => {
    return Math.max(...habits.map(getStreak), 0);
  };

  if (isLoading) {
    return <p className="text-5xl text-gray-700">Loading...</p>;
  }
  return (
    <div className="shadow-xl rounded-xl mb-30 py-5 px-2">
      <p className="text-lg text-gray-800 mb-3">Habit Statistics</p>
      <p className="text-sm text-gray-700">Total Habits: {habits.length}</p>
      <p className="text-sm text-gray-700">
        Completed Today: {todaysCompletedTodosLength.length}
      </p>
      <p className="text-sm text-gray-700">
        Longest Streak: {getLongestStreak()}
      </p>
    </div>
  );
};

export default HabitStats;

import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io";
import { toggleHabit } from "../store/habit-slice";

const HabitList = () => {
  const habits = useSelector((state) => state.habits.habits);
  const dispatch = useDispatch();
  const today = new Date().toISOString().split("T")[0];

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

  return (
    <ul className="flex flex-col gap-4 mb-8">
      {habits.map((habit) => {
        return (
          <li className="shadow-md p-4 rounded-md">
            <div className="flex mb-3">
              <p className="flex flex-col   flex-1">
                <span className="text-lg">{habit.name}</span>
                <span className="text-sm text-gray-500">{habit.frequency}</span>
              </p>
              <button
                className={`flex items-center gap-2 border mr-2 px-4 rounded-lg h-10 hover:cursor-pointer 
    ${
      habit.completedDates.includes(today) ? "text-green-600" : "text-blue-500"
    }`}
                onClick={() =>
                  dispatch(toggleHabit({ id: habit.id, date: today }))
                }
              >
                <FaCheckCircle className="size-6" />
                {habit.completedDates.includes(today)
                  ? "Completed"
                  : "Mark Complete"}
              </button>

              <button className="flex items-center gap-2 text-red-700 border px-3 rounded-lg h-10 hover:cursor-pointer">
                <IoMdTrash className="size-6" /> REMOVE
              </button>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">
                Current Streak: {getStreak(habit)} days
              </p>

              <progress
                value={(getStreak(habit) / 30) * 100}
                className="w-full"
                max={100}
              ></progress>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default HabitList;

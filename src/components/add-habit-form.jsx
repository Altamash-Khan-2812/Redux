import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../store/habit-slice";

const AddHabitForm = () => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const dispatch = useDispatch();

  function handleFormSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      dispatch(
        addHabit({
          name,
          frequency,
        })
      );
      setName("");
      setFrequency("Daily");
    }
  }

  return (
    <form className="flex flex-col gap-5 mb-10" onSubmit={handleFormSubmit}>
      <div className="flex flex-col">
        <label
          htmlFor="habit"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Enter Habit Name:
        </label>
        <input
          type="text"
          id="habit"
          placeholder="Habit Name"
          autoComplete="off"
          value={name}
          className="border border-gry-400 rounded px-3 py-2 w-full"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="frequency"
          className="mb-1 text-sm font-medium text-gray-700"
        >
          Frequency:
        </label>
        <select
          id="frequency"
          className="border border-gray-400 rounded px-3 py-2 w-full "
          onChange={(e) => setFrequency(e.target.value)}
          value={frequency}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-indigo-950 hover:bg-indigo-900 hover:cursor-pointer text-white w-full py-2 text-xl"
      >
        Add Habit
      </button>
    </form>
  );
};

export default AddHabitForm;

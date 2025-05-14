import "./App.css";
import AddHabitForm from "./components/add-habit-form";

function App() {
  return (
    <div className="w-3/5 mx-auto">
      <p className="text-center text-5xl mt-4 text-gray-700 mb-10">
        Habit Tracker
      </p>
      <AddHabitForm />
    </div>
  );
}

export default App;

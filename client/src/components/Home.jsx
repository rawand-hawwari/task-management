import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addTask, removeTask, setTasks, updateState } from "../redux/TaskSlice";
import TaskList from "./TaskList";

const Home = () => {
  return (
  <div>
    <TaskList />
  </div>);
};

export default Home;

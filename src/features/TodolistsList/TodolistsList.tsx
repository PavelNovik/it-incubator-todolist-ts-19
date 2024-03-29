import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FilterValuesType,
  selectTodolists,
  todolistsActions,
  todolistsThunks
} from "features/TodolistsList/todolists.reducer";
import { selectTasks, tasksThunks } from "features/TodolistsList/tasks.reducer";
import { Grid, Paper } from "@mui/material";
import { AddItemForm } from "common/components";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { useActions } from "common/hooks";
// import { selectTodolists } from "features/TodolistsList/todolists.selectors";
import { TaskStatuses } from "common/enums";
import { selectIsLoggedIn } from "features/auth/auth.reducer";

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // const dispatch = useAppDispatch();

  // const { fetchTodolists: fetchTodo, removeTodolist: removeTodo, addTodolist: addTodo, changeTodolistTitle: changeTodoTitle } = useActions(todolistsThunks)
  //
  // const {addTask, removeTask, updateTask } = useActions(tasksThunks)
  //
  // const {changeTodolistFilter} = useActions(todolistsActions)

  const {
    fetchTodolists: fetchTodo,
    removeTodolist: removeTodo,
    addTodolist: addTodo,
    changeTodolistTitle: changeTodoTitle,
    addTask,
    removeTask,
    updateTask,
    changeTodolistFilter
  } = useActions({ ...todolistsThunks, ...tasksThunks, ...todolistsActions });

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    // dispatch(todolistsThunks.fetchTodolists());
    fetchTodo();
  }, []);

  const removeTaskCb = useCallback(function(taskId: string, todolistId: string) {
    // dispatch(tasksThunks.removeTask({ taskId, todolistId }));
    removeTask({ taskId, todolistId });
  }, []);

  const addTaskCb = useCallback(function(title: string, todolistId: string) {
    // dispatch(tasksThunks.addTask({ title, todolistId }));
    addTask({ title, todolistId });
  }, []);

  const changeStatusCb = useCallback(function(taskId: string, status: TaskStatuses, todolistId: string) {
    // dispatch(tasksThunks.updateTask({ taskId, domainModel: { status }, todolistId }));
    updateTask({ taskId, domainModel: { status }, todolistId });
  }, []);

  const changeTaskTitleCb = useCallback(function(taskId: string, title: string, todolistId: string) {
    // dispatch(tasksThunks.updateTask({ taskId, domainModel: { title }, todolistId }));
    updateTask({ taskId, domainModel: { title }, todolistId });
  }, []);

  const changeFilterCb = useCallback(function(filter: FilterValuesType, id: string) {
    // dispatch(todolistsActions.changeTodolistFilter({ id, filter }));
    changeTodolistFilter({ id, filter });
  }, []);

  const removeTodolist = useCallback(function(id: string) {
    // dispatch(todolistsThunks.removeTodolist(id));
    removeTodo(id);
  }, []);

  const changeTodolistTitle = useCallback(function(id: string, title: string) {
    // dispatch(todolistsThunks.changeTodolistTitle({ id, title }));
    changeTodoTitle({ id, title });
  }, []);

  const addTodolist = useCallback(
    (title: string) => {
      // dispatch(todolistsThunks.addTodolist(title));
      addTodo(title);
    },
    []
  );

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTaskCb}
                  changeFilter={changeFilterCb}
                  addTask={addTaskCb}
                  changeTaskStatus={changeStatusCb}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitleCb}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

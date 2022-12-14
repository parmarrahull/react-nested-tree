import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import TaskList from "./TaskList";
import "antd/dist/antd.css";
import { Select } from "antd";

const Homepage = () => {
  const [taskInput, setTaskInput] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [pendingTaskList, setPendingTaskList] = useState([]);
  const [completedTaskList, setCompletedTaskList] = useState([]);
  const [showPending, setShowPending] = useState(true);
  const [selectTask, setSelectTask] = useState("");
  const [isActive, setIsActive] = useState(false);

  console.log("selectTask", selectTask);

  const handleClick = () => {
    //  toggle isActive state on click
    setIsActive((current) => !current);
  };

  // Completed Task List And Pending Task List
  useEffect(() => {
    const pendingTasks = taskList.filter((task) => task.isPending === true);
    setPendingTaskList(pendingTasks);
    const completedTasks = taskList.filter((task) => task.isPending === false);
    setCompletedTaskList(completedTasks);
  }, [taskList]);

  let itemEvent = (e) => {
    setTaskInput(e.target.value);
  };

  let selectTasks = (event) => {
    setSelectTask(event.target.value);
  };

  // Input Task Data And save
  const listOfTask = (e) => {
    e.preventDefault();
    if (taskInput) {
      setTaskList([
        ...taskList,
        {
          id: uniqid(),
          isPending: true,
          value: taskInput,
          date: new Date().toLocaleString(),
          category: selectTask || "global___array",
        },
      ]);
      setTaskInput("");
    } else {
      alert("Enter the task");
    }
  };

  const handleCheckboxTask = (e, id) => {
    if (e.target.checked) {
      const updatedTaskList = taskList.map((itemvalue) => {
        if (itemvalue.id === id) {
          return { ...itemvalue, isPending: false };
        } else {
          return itemvalue;
        }
      });
      setTaskList(updatedTaskList);
    } else {
      const updatedTaskList = taskList.map((itemvalue) => {
        if (itemvalue.id === id) {
          return { ...itemvalue, isPending: true };
        } else {
          return itemvalue;
        }
      });
      setTaskList(updatedTaskList);
    }
  };

  const deleteItems = (id) => {
    const result = taskList.filter((obj) => {
      return obj.id !== id;
    });
    setTaskList(result);
  };

  const onSortAsc = () => {
    const ascending = [...taskList].sort((a, b) => (a.date < b.date ? -1 : 1));
    setTaskList(ascending);
  };

  const onSortDesc = () => {
    const descending = [...taskList].reverse((a, b) =>
      a.date < b.date ? -1 : 1
    );
    setTaskList(descending);
  };

  const copyTask = (e, id) => {
    e.preventDefault();
    let copy = taskList.find((e) => e.id === id);
    const { value } = copy;
    {
      copy.isPending === true
        ? setTaskList([
            {
              id: uniqid.process(),
              isPending: true,
              parentId: selectTask.toString(),
              value: value,
              date: new Date().toLocaleString(),
            },
            ...taskList,
          ])
        : setTaskList([
            {
              id: uniqid.process(),
              isPending: false,
              value: value,
              parentId: selectTask.toString(),
              date: new Date().toLocaleString(),
            },
            ...taskList,
          ]);
    }
  };
  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: 20 }}>TO Do List</h1>
      <div style={{ margin: 10 }}>
        <div className="row" style={{ justifyContent: "center" }}>
          <div
            style={{ backgroundColor: "whitesmoke" }}
            className="col-sm-6 mt-5"
          >
            <form onSubmit={listOfTask}>
              <div>
                {/* <label className="m-5">Select Category</label> */}
                <select id="selecttask" onChange={selectTasks}>
                  <option value="global___array">Select Task</option>

                  {taskList.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.value}
                    </option>
                  ))}
                </select>
              </div>
              <br />

              <input
                style={{ marginTop: 20 }}
                onChange={itemEvent}
                value={taskInput}
                className="form-control form-control-lg"
                type="text"
                placeholder="Add Task"
                aria-label=".form-control-lg example"
              ></input>
              <div style={{ marginTop: 20 }}>
                <button
                  // onClick={listOfTask}
                  type="Submit"
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
            </form>

            <button
              style={{ margin: 10, borderRadius: 12 }}
              onClick={() => {
                setShowPending(true);
                handleClick();
              }}
              type="button"
              // className="btn btn-secondary"
              className={isActive ? "" : "bg-salmon"}
            >
              Pending Task List
              <CaretUpOutlined onClick={onSortAsc} />
              <CaretDownOutlined onClick={onSortDesc} />
            </button>

            <button
              style={{ margin: 10, borderRadius: 12 }}
              onClick={() => {
                setShowPending(false);
                handleClick();
              }}
              type="button"
              // className="btn btn-secondary"
              className={isActive ? "bg-salmon" : ""}
            >
              Completed Task List
              <CaretUpOutlined onClick={onSortAsc} />
              <CaretDownOutlined onClick={onSortDesc} />
            </button>

            <div style={{ margin: 20 }}>
              {/* {showPending ? ( */}
              <TaskList
                taskList={showPending ? pendingTaskList : completedTaskList}
                title={
                  showPending ? "Pending Task List" : "Completed Task List"
                }
                onChangeHandler={handleCheckboxTask}
                deleteData={deleteItems}
                copyItem={copyTask}
              />
              {/* )  */}

              {/* : (
                <TaskList
                  taskList={completedTaskList}
                  title={"Completed Task List"}
                  onChangeHandler={handleCheckboxTask}
                  deleteData={deleteItems}
                  copyItem={copyTask}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;

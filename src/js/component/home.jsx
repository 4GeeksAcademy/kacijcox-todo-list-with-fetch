import React, { useEffect, useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/kcox");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const fetchTasks = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/")
      .then((resp) => resp.json())
      .then((data) => {
        // Update the local state with the fetched tasks
        setTodos(data);
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
      });
  };

  const createTask = () => {
    // Add a new task to the server
    fetch("https://playground.4geeks.com/apis/fake/todos/user/", {
      method: "POST",
      body: JSON.stringify([]), // Pass an empty array since there are no todos yet
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // Update the local state with the new tasks from the server
        setTodos([]);
        setInputValue(""); // Clear input after adding task
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
      });
  };

 
  const deleteTask = (index) => {
    // Delete a task from the server
    fetch("https://playground.4geeks.com/apis/fake/todos/user/kcox", {
      method: "PUT",
      body: JSON.stringify(todos.filter((_, currentIndex) => index !== currentIndex)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // Update the local state with the new tasks from the server
        setTodos(data);
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
      });
  };

  const clearAllTasks = () => {
    // Clear all tasks on the server
    fetch("https://playground.4geeks.com/apis/fake/todos/user/kcox", {
      method: "DELETE", // Use DELETE method for clearing all tasks
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        // Update the local state with an empty list
        setTodos([]);
      })
      .catch((error) => {
        // Handle errors
        console.log(error);
      });
  };

 return (
  <div className="container">
    <h1>My Todos</h1>
    <ul>
      <li>
        <input 
        type="text" 
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
          setTodos((prevTodos) => [...prevTodos, inputValue]);
          setInputValue("");
          }
        }}
        placeholder="What do you need to do?!?"></input></li>
        {todos.map((item, index) => (
        <li>{item}<i class="fa-solid fa-trash" onClick={() => setTodos(todos.filter((t, currentIndex) => index != currentIndex))}></i></li>
        ))}
    </ul>
    <div>{todos.length}</div>
  </div>
);
};

export default Home;



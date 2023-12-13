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

  useEffect(() => {
    const updateTodosOnServer = async () => {
      try {
        const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/kcox", {
          method: "PUT",
          body: JSON.stringify(todos),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to update todos on the server");
      }
      } catch (error) {
        console.error("Error updating todos on the server:", error);
      }
    };

    updateTodosOnServer();
  }, [todos]);

  const fetchTasks = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/kcox")
      .then((resp) => resp.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createTask = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/", {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTodos([]);
        setInputValue("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTask = (index) => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/kcox", {
      method: "PUT",
      body: JSON.stringify(todos.filter((_, currentIndex) => index !== currentIndex)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearAllTasks = () => {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/kcox", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTodos([]);
      })
      .catch((error) => {
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
                setTodos((prevTodos) => [...prevTodos, { label: inputValue, done: false }]);
                setInputValue("");
              }
            }}
            placeholder="What do you need to do?!?"
          />
        </li>
        {todos.map((item, index) => (
          <li key={index}>
            {item.label}
            <i className="fa-solid fa-trash" onClick={() => deleteTask(index)}></i>
          </li>
        ))}
      </ul>
      <div>{todos.length}</div>
    </div>
  );
};

export default Home;

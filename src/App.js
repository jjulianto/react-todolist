import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Card from "./components/Card";

function App() {
  const [todos, setTodos] = useState([]);
  const [formTodo, setFormTodo] = useState({
    id: 1,
    title: "",
    description: "",
    date: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);

  const getDataAPI = () => {
    axios
      .get(`http://localhost:5000/todos`)
      .then((response) => {
        const responseAPI = response.data;
        setTodos(responseAPI);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataAPI();
  }, []);

  const postDataToAPI = () => {
    axios
      .post(`http://localhost:5000/todos`, formTodo)
      .then((response) => {
        console.log(response);
        getDataAPI();
        setFormTodo({
          id: 1,
          title: "",
          description: "",
          date: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const putDataToAPI = () => {
    axios
      .put(`http://localhost:5000/todos/${formTodo.id}`, formTodo)
      .then((response) => {
        console.log(response);
        getDataAPI();
        setFormTodo({
          id: 1,
          title: "",
          description: "",
          date: "",
        });
        setIsUpdate(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormChange = (event) => {
    let formTodoNew = { ...formTodo };
    let timestamp = new Date().getTime();
    if (!isUpdate) {
      formTodoNew["id"] = timestamp;
    }
    formTodoNew[event.target.name] = event.target.value;
    setFormTodo(formTodoNew);
  };

  const handleSearch = (event) => {
    axios
      .get(`http://localhost:5000/todos?q=${event.target.value}`)
      .then((response) => {
        const responseAPI = response.data;
        setTodos(responseAPI);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleSortbyDate = (event) => {
    if (event.target.value === "latest") {
      axios
        .get(`http://localhost:5000/todos?_sort=date&_order=desc`)
        .then((response) => {
          const responseAPI = response.data;
          setTodos(responseAPI);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`http://localhost:5000/todos?_sort=date&_order=asc`)
        .then((response) => {
          const responseAPI = response.data;
          setTodos(responseAPI);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleUpdate = (data) => {
    setFormTodo(data);
    setIsUpdate(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#198754",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/todos/${id}`)
          .then((response) => {
            console.log(response);
            getDataAPI();
            Swal.fire("Success", "Successfully Delete Todo", "success");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isUpdate) {
      putDataToAPI();
    } else {
      postDataToAPI();
    }
  };

  return (
    <div className="wrapper">
      <header className="header">
        <nav className="nav container">
          <p className="nav-title">Todo Apps</p>
        </nav>
      </header>
      <section>
        <div className="home-container container">
          <div className="home-input">
            <h1 className="home-input-title">Todolist</h1>
            <p className="home-input-subtitle">Insert the todo data below.</p>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter the title of the todo here"
              onChange={(e) => handleFormChange(e)}
              value={formTodo.title}
            ></input>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              cols="80"
              rows="5"
              placeholder="Enter the description of the todo here"
              onChange={(e) => handleFormChange(e)}
              value={formTodo.description}
            ></textarea>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={(e) => handleFormChange(e)}
              value={formTodo.date}
            ></input>
            <button className="btn-submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
          </div>
          <div className="home-output">
            <h1 className="home-output-title">Todolist</h1>
            <div className="input-inline">
              <select name="sort" onChange={(e) => handleSortbyDate(e)}>
                <option>Sort by Date</option>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
              <input
                type="search"
                name="search"
                placeholder="Search todo..."
                onKeyUp={(e) => handleSearch(e)}
              ></input>
            </div>
            {todos.map((todo) => (
              <Card
                key={todo.id}
                todo={todo}
                deleteTodo={handleDelete}
                updateTodo={handleUpdate}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

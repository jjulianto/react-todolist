import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function Card(props) {
  return (
    <div className="card">
      <div className="card-text">
        <p className="card-title">{props.todo.title}</p>
        <p className="card-subtitle">
          {props.todo.description}, ({props.todo.date})
        </p>
      </div>
      <div className="card-button">
        <button
          className="btn-edit"
          onClick={() => props.updateTodo(props.todo)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="btn-delete"
          onClick={() => props.deleteTodo(props.todo.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

export default Card;

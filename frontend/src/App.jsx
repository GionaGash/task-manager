import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/tasks";

function App() {
    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Получение задач
    const loadTasks = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            setTasks(data);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    // Создание задачи
    const createTask = async (event) => {
        event.preventDefault();

        if (!title.trim()) {
            alert("Введите название задачи");
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    description
                })
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.error);
                return;
            }

            setTitle("");
            setDescription("");

            loadTasks();

        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    // Изменение статуса
    const changeStatus = async (id, status) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status
                })
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.error);
                return;
            }

            loadTasks();

        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    // Удаление
    const deleteTask = async (id) => {
        if (!confirm("Удалить эту задачу?")) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.error);
                return;
            }

            loadTasks();

        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return (
        <div className="container">

            <h1>Менеджер задач</h1>

            <form className="task-form" onSubmit={createTask}>

                <input
                    type="text"
                    placeholder="Название задачи"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <textarea
                    placeholder="Описание задачи"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                <button type="submit">
                    Создать задачу
                </button>

            </form>

            <div className="table-container">

                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Название</th>
                            <th>Описание</th>
                            <th>Статус</th>
                            <th>Дата создания</th>
                            <th>Действия</th>
                        </tr>
                    </thead>

                    <tbody>

                        {tasks.map((task) => (

                            <tr key={task.id}>

                                <td>{task.id}</td>

                                <td>{task.title}</td>

                                <td>{task.description}</td>

                                <td>
                                    <select
                                        value={task.status}
                                        onChange={(event) =>
                                            changeStatus(
                                                task.id,
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="new">
                                            Новая
                                        </option>

                                        <option value="in_progress">
                                            В работе
                                        </option>

                                        <option value="done">
                                            Выполнена
                                        </option>
                                    </select>
                                </td>

                                <td>
                                    {new Date(
                                        task.created_at
                                    ).toLocaleString()}
                                </td>

                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            deleteTask(task.id)
                                        }
                                    >
                                        Удалить
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                {tasks.length === 0 && (
                    <p className="empty">
                        Задач пока нет
                    </p>
                )}

            </div>

        </div>
    );
}

export default App;
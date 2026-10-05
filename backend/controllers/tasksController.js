const pool = require("../db");

// Получение всех задач
const getTasks = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY created_at DESC"
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Ошибка при получении задач"
        });
    }
};


// Создание задачи
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                error: "Название задачи обязательно"
            });
        }

        const result = await pool.query(
            `INSERT INTO tasks (title, description)
             VALUES ($1, $2)
             RETURNING *`,
            [title.trim(), description || ""]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Ошибка при создании задачи"
        });
    }
};


// Изменение статуса
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "new",
            "in_progress",
            "done"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                error: "Недопустимый статус"
            });
        }

        const result = await pool.query(
            `UPDATE tasks
             SET status = $1
             WHERE id = $2
             RETURNING *`,
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Задача не найдена"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Ошибка при изменении задачи"
        });
    }
};


// Удаление задачи
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM tasks
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Задача не найдена"
            });
        }

        res.json({
            message: "Задача удалена"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Ошибка при удалении задачи"
        });
    }
};


module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};
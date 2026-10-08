import csv
import psycopg2


DB_CONFIG = {
    "host": "127.0.0.1",
    "port": 5433,
    "database": "task_manager",
    "user": "postgres",
    "password": "postgres"
}


def export_tasks():
    connection = None

    try:
        connection = psycopg2.connect(**DB_CONFIG)

        cursor = connection.cursor()

        cursor.execute("""
            SELECT
                id,
                title,
                description,
                status,
                created_at
            FROM tasks
            ORDER BY id
        """)

        tasks = cursor.fetchall()

        with open(
            "tasks.csv",
            "w",
            newline="",
            encoding="utf-8-sig"
        ) as csv_file:

            writer = csv.writer(csv_file)

            writer.writerow([
                "id",
                "title",
                "description",
                "status",
                "created_at"
            ])

            writer.writerows(tasks)

        cursor.close()

        print("Задачи успешно экспортированы в tasks.csv")

    except Exception as error:
        print("Ошибка:", error)

    finally:
        if connection:
            connection.close()


if __name__ == "__main__":
    export_tasks()
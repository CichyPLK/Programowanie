from sqlalchemy import create_engine, text

# Połączenie z bazą danych MySQL
DATABASE_URL = "mysql+pymysql://sql7765834:CQ6FJLnQ2C@sql7.freesqldatabase.com:3306/sql7765834"
engine = create_engine(DATABASE_URL)

# Usunięcie wszystkich użytkowników
with engine.connect() as conn:
    conn.execute(text("DELETE FROM user"))  # ❌ Usuwa wszystkich użytkowników
    conn.commit()  # ✅ Zatwierdza zmiany
    print("✅ Wszyscy użytkownicy zostali usunięci.")

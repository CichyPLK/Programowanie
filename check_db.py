from sqlalchemy import create_engine, text

# Połączenie z bazą danych MySQL
DATABASE_URL = "mysql+pymysql://sql7765834:CQ6FJLnQ2C@sql7.freesqldatabase.com:3306/sql7765834"

# Tworzymy silnik połączenia
engine = create_engine(DATABASE_URL)

# Połącz się i sprawdź strukturę tabeli user
with engine.connect() as conn:
    result = conn.execute(text("DESC user"))  # ✅ Użyj `text()`, aby wykonać surowe zapytanie SQL

    print("Struktura tabeli `user` w bazie danych:")
    for row in result:
        print(row)

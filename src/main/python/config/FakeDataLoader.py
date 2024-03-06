import logging
from DatabaseConfig import db
from pathlib import Path
import pandas as pd


def load_fake_data(app):
    with app.app_context():
        default_fake_data = Path(__file__).resolve().parents[2] / "resources" / "config" / "liquibase" / "data"
        user_fake_data = Path(__file__).resolve().parents[2] / "resources" / "config" / "liquibase" / "fake-data"

        data_load_object = [
            {"table": "jhi_user", "file": "user.csv", "file_location": default_fake_data},
            {"table": "jhi_authority", "file": "authority.csv", "file_location": default_fake_data},
            {"table": "jhi_user_authority", "file": "user_authority.csv", "file_location": default_fake_data},
            # pyhipster-needle-user-defined-model-fake-data
        ]

        for data_load in data_load_object:
            logging.info("Checking data load for " + data_load["table"])
            result = db.session.execute("SELECT count(1) FROM " + data_load["table"]).scalar()

            if result < 1:
                data_file = data_load["file_location"] / data_load["file"]
                if data_file.is_file():
                    # Load data only if the table exists, and is empty and the corresponding file is available
                    print("Loading data file " + str(data_file) + " to table " + str(data_load["table"]))
                    df = pd.read_csv(data_file, delimiter=";", header=0)
                    df.to_sql(data_load["table"], con=db.get_engine(), if_exists="append", index=False)
            else:
                logging.info(data_load["table"] + " is already populated. Skipping fake data load...")

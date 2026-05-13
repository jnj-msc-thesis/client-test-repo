import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///retail_store.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    JSON_SORT_KEYS = False

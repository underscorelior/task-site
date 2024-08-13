import random
import dotenv, os
from supabase import create_client, Client

users = ["luke", "lior", "ishaan", "soham", "sam"]


def user(single=False):
    out = {}
    for user in users:
        out[user] = {"score": random.randint(0, 1 if single else 100)}
    print(str(out))
    return out


data = [
    {
        "name": "Exercise for an hour",
        "description": "One point per FULL hour",
        "type": "multi",
        "points": 5,
        "category": "health",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Go outside for an hour",
        "description": "One point per FULL hour, school doesn't count, you can't be inside a building",
        "type": "multi",
        "points": 3,
        "category": "health",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Meditate for at least 20 minutes",
        "description": "One point per FULL 20 minutes",
        "type": "multi",
        "points": 1,
        "category": "health",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Do a T-25 video",
        "description": "Fitness video",
        "type": "multi",
        "points": 1,
        "category": "health",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Times homework was late",
        "description": "One point for each late assignment, least points win",
        "type": "multi",
        "points": 3,
        "category": "productivity",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Read a book that was not assigned in school",
        "description": "Must finish book, can't be a children's book/manga. 200 page minimum",
        "type": "multi",
        "points": 2,
        "category": "productivity",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Go to sleep before 1:30 AM",
        "description": "",
        "type": "daily",
        "points": 2,
        "category": "health",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Drink 6 glasses of water every day",
        "description": "6 glasses is fine, although 8 is better",
        "type": "daily",
        "points": 4,
        "category": "health",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Have at least 6 hours of sleep that night",
        "description": "One point per day",
        "type": "daily",
        "points": 2,
        "category": "health",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Watch the news",
        "description": "One point per day",
        "type": "daily",
        "points": 1,
        "category": "normal",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Go a day without video games",
        "description": "Does not conflict with the Play Among Us task unless you play more than 1 round of Among Us",
        "type": "daily",
        "points": 2,
        "category": "productivity",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Be productive",
        "description": "5 hours after school on a school day, 10 hours on non-school days",
        "type": "daily",
        "points": 3,
        "category": "productivity",
        "users": user(),
        "lower": False,
    },
    {
        "name": "Talk with someone you haven't talked to for 5+ years",
        "description": "",
        "type": "single",
        "points": 2,
        "category": "normal",
        "users": user(True),
        "lower": False,
    },
    {
        "name": "Go to prom",
        "description": "",
        "type": "single",
        "points": 5,
        "category": "normal",
        "users": user(True),
        "lower": False,
    },
    {
        "name": "Go on a date",
        "description": "Needs proof, can't be with other participants, must be IRL, must be romantic, must be over 1 hour, must be with preferred gender",
        "type": "single",
        "points": 5,
        "category": "normal",
        "users": user(True),
        "lower": False,
    },
    {
        "name": "Eat something which you haven't ate before",
        "description": "",
        "type": "single",
        "points": 1,
        "category": "normal",
        "users": user(True),
        "lower": False,
    },
    {
        "name": "Go to someplace new far away",
        "description": "Must be over 10 miles away from home, must be somewhere where you haven't been before",
        "type": "single",
        "points": 1,
        "category": "normal",
        "users": user(True),
        "lower": False,
    },
]

dotenv.load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)


def test():
    try:
        response = supabase.table("tasks").insert(data).execute()
        return response
    except Exception as exception:
        return exception


print(test())

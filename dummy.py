import random

users = ["luke", "lior", "ishaan", "soham", "sam"]

# function user(single = false): Task['scores'] {
# 	const out: Task['scores'] = {};
# 	users.forEach((user) => {
# 		out[user] = Math.floor(Math.random() * (single ? 2 : 100));
# 	});
# 	return out;
# }


def user(single=False):
    out = {}
    for user in users:
        out[user] = random.randint(0, 1 if single else 100)
    print(str(out))
    return str(out)


data = [
    {
        "name": "Exercise for an hour",
        "description": "One point per FULL hour",
        "type": "multi",
        "points": "5",
        "category": "health",
        "scores": user(),
    },
    {
        "name": "Go outside for an hour",
        "description": "One point per FULL hour, school doesn't count, you can't be inside a building",
        "type": "multi",
        "points": "3",
        "category": "health",
        "scores": user(),
    },
    {
        "name": "Meditate for at least 20 minutes",
        "description": "One point per FULL 20 minutes",
        "type": "multi",
        "points": "1",
        "category": "health",
        "scores": user(),
    },
    {
        "name": "Do a T-25 video",
        "description": "Fitness video",
        "type": "multi",
        "points": "1",
        "category": "health",
        "scores": user(),
    },
    {
        "name": "Times homework was late",
        "description": "One point for each late assignment, least points win",
        "type": "multi",
        "points": "3",
        "category": "productivity",
        "scores": user(),
    },
    {
        "name": "Read a book that was not assigned in school",
        "description": "Must finish book, can't be a children's book/manga. 200 page minimum",
        "type": "multi",
        "points": "2",
        "category": "productivity",
        "scores": user(),
    },
    {
        "name": "Go to sleep before 1:30 AM",
        "description": "",
        "type": "daily",
        "points": "2",
        "category": "health",
        "scores": user(),
    },
    {
        "name": "Drink 6 glasses of water every day",
        "description": "6 glasses is fine, although 8 is better",
        "type": "daily",
        "points": "4",
        "category": "health",
        "scores": user(),
    },
    {
        "name": "Have at least 6 hours of sleep that night",
        "description": "One point per day",
        "type": "daily",
        "points": "2",
        "category": "health",
        "scores": user(),
    },
    {
        "name": "Watch the news",
        "description": "One point per day",
        "type": "daily",
        "points": "1",
        "category": "normal",
        "scores": user(),
    },
    {
        "name": "Go a day without video games",
        "description": "Does not conflict with the Play Among Us task unless you play more than 1 round of Among Us",
        "type": "daily",
        "points": "2",
        "category": "productivity",
        "scores": user(),
    },
    {
        "name": "Be productive",
        "description": "5 hours after school on a school day, 10 hours on non-school days",
        "type": "daily",
        "points": "3",
        "category": "productivity",
        "scores": user(),
    },
    {
        "name": "Talk with someone you haven't talked to for 5+ years",
        "description": "",
        "type": "single",
        "points": "2",
        "category": "normal",
        "scores": user(True),
    },
    {
        "name": "Go to prom",
        "description": "",
        "type": "single",
        "points": "5",
        "category": "normal",
        "scores": user(True),
    },
    {
        "name": "Go on a date",
        "description": "Needs proof, can't be with other participants, must be IRL, must be romantic, must be over 1 hour, must be with preferred gender",
        "type": "single",
        "points": "5",
        "category": "normal",
        "scores": user(True),
    },
    {
        "name": "Eat something which you haven't ate before",
        "description": "",
        "type": "single",
        "points": "1",
        "category": "normal",
        "scores": user(True),
    },
    {
        "name": "Go to someplace new far away",
        "description": "Must be over 10 miles away from home, must be somewhere where you haven't been before",
        "type": "single",
        "points": "1",
        "category": "normal",
        "scores": user(True),
    },
]

print(data)

with open("dummy.csv", "w+") as f:
    f.write("name,description,type,points,category,scores\n")
    for i in data:
        x = []
        for j in i.values():
            x.append(f'"{str(j)}"')
        f.write(",".join(x) + "\n")

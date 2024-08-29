# Task Site

Simple task site for me and my friends to use to improve ourselves!

## Tech Used:

- Frontend: ReactJS
- Backend: Vercel Functions
- Database: Supabase
- Styling: TailwindCSS and ShadCN

## How To Run:

- Clone the repository
- Install necessary packages using `npm`, `yarn`, or your favorite package manager
- Setup the `.env`:

  ```py
  SUPABASE_KEY = ""
  SUPABASE_URL = ""

  PERMISSION_CODE = "" # Code for users to get into the website
  ```

- Edit [src/config.ts](src/config.ts) to include the names and amount of players you have.
- Start the dev server by running `vercel dev`

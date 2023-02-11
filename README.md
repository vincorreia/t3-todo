# Todolist

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## v1
### Frontend

#### Key features
- [x] Create a todolist
- [x] Edit todolist title
- [x] Todolist page
- [x] Create a todo item
- [x] Edit todo item title
- [x] Check todo item title
- [x] Informative toasts
- [x] Delete todo/todolist confirmation modal
- [x] Visuals for checked items
- [x] Authentication
- [ ] SSR

### Backend

#### Key features
- [x] Create a todolist
- [x] Edit todolist title
- [x] Create a todo item
- [x] Edit todo item title
- [x] Check todo item title
- [x] Delete todo/todolist confirmation modal
- [x] Error handling and getting informative errors to the frontend
- [x] Authentication

## Upcoming

### Frontend

#### Features
- [ ] Create shopping list instead of a regular todolist
- [ ] Convert a regular todolist to shopping list
- [ ] If the todolist is a shopping list, todo items should display it's amount
- [ ] If the todolist is a shopping list, it should be possible to increase or decrease the item's amount
- [ ] Should be possible to edit the item's amount on todo item edition screen


### Backend

#### Features
- [x] Validate if a todolist is empty on edit endpoint, in case it's not, it should not be possible to change it's type
- [x] Create shopping list instead of a regular todolist
- [ ] Endpoint for increasing/decreasing amount of an item, should validate either the todolist is of type shopping list, if it's not it should return an error
- [ ] Adapt todo item edit endpoint to be possible to edit the amount as well, should validate either the todolist is of type shopping list, if it's not it should return an error

## Technologies used
- TypeScript as the main language of the project
- tRPC as backend & frontend communication interface
- Prisma as ORM
- PostgreSQL as DB
- NextJS as the main JS framework for both backend and frontend
- TailwindCSS as the main CSS framework
- Jotai for global state management (Frontend)
- Vercel for hosting

---
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)![NextJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

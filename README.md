# Todolist

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## v1
### Frontend

#### Key features
- Create a todolist
![Create Todolist](https://user-images.githubusercontent.com/78707622/218566784-ca4985d1-1edc-4796-ab56-adda960c8e06.gif)

---
- Edit todolist title
![Update Todolist](https://user-images.githubusercontent.com/78707622/218567090-4450aa44-00ea-4c8d-bb88-029bbd4dcd5d.gif)

---
- Create a todo item
![Create Todo](https://user-images.githubusercontent.com/78707622/218568031-cba1c9fd-ead7-4f27-934d-ace5d311e9fe.gif)

---
- Edit todo item title
![Edit Todo](https://user-images.githubusercontent.com/78707622/218568298-31dcc9f4-daa2-42b7-9d8f-6c1a2eee5480.gif)

---
- Check todo item
![Check Todo](https://user-images.githubusercontent.com/78707622/218568467-776b6082-1b55-4b0a-b1c0-f5f264304eaf.gif)

---
- Delete todo/todolist confirmation modal
![Delete Todolist](https://user-images.githubusercontent.com/78707622/218567381-dc9956f7-41fd-4b69-a820-f291a7f7add9.gif)

---
- Authentication
![Authentication](https://user-images.githubusercontent.com/78707622/218569366-71084ccc-26fe-419c-8cf3-cc5d9e41df9e.gif)

---
- SSR (Prefetching)

##### To achieve the desired result (already have a pre-rendered page from server side) I've used a SSGHelper function to prefetch the initial query. I've created a reusable utility function to create this SSG.
```ts
export const getSSGHelpers = async (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) => {
  const session = await getServerAuthSession({ req, res });
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session }),
    transformer: superjson,
  });
  return ssg;
};
```

##### Usage example:
```ts
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const ssg = await getSSGHelpers(req, res);

  await ssg.todolists.getAll.prefetch();
  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
```
---
- Informative toasts

##### Informative toasts for error, loading & success. Those toasts are implemented using global state via jotai & with React portals so that they can be rendered on the body directly instead of inside of the application. They can be called using the hook ```useCreateToast``` and the helper functions that it returns, ```successToast, errorToast & loadingToast``` all of which accepts two parameters, first being the text to be displayed on the toast and the second being optional and the duration that the toast will be displayed for.

Implementation example:
```ts
 const { errorToast } = useCreateToast();
  const onError = <DataType extends { message: string }>(error: DataType) => {
    errorToast(error.message);
  };
 ```
---

### Backend

#### Key features
- Create a todolist
- Edit todolist title
- Create a todo item
- Edit todo item title
- Check todo item title
- Delete todo/todolist confirmation modal
- Error handling and getting informative errors to the frontend
- Authentication

## Upcoming

### Frontend

#### Features
- [x] Create shopping list instead of a regular todolist
- [x] Convert a regular todolist to shopping list
- [x] If the todolist is a shopping list, todo items should display it's amount
- [x] If the todolist is a shopping list, it should be possible to increase or decrease the item's amount
- [x] Should be possible to edit the item's amount on todo item edition screen


### Backend

#### Features
- [x] Validate if a todolist is empty on edit endpoint, in case it's not, it should not be possible to change it's type
- [x] Create shopping list instead of a regular todolist
- [x] Endpoint for increasing/decreasing amount of an item, should validate either the todolist is of type shopping list, if it's not it should return an error
- [x] Adapt todo item edit endpoint to be possible to edit the amount as well, should validate either the todolist is of type shopping list, if it's not it should return an error

## Technologies used
- TypeScript as the main language of the project
- tRPC as backend & frontend communication interface
- Prisma as ORM
- PostgreSQL as DB
- NextJS as the main JS framework for both backend and frontend
- TailwindCSS as the main CSS framework
- Jotai for global state management (Frontend)
- Vercel for hosting
- NextAuth & Google oAuth for authentication
---
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)![NextJS](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

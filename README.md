# ToDo List Statemachine - XState - _Full Stack Project_

This project is a demonstration of a reactive UI driven by a state machine using **XState v5** library. It's a simple To-Do list application where the entire application flow—from loading data to creating, and deleting items—is managed and orchestrated by a **statechart**.

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [State Machine Diagram](#state-machine-diagram)
- [Key Features](#key-features)
- [Example procedure](#example-procedure)
- [Screenshots](#screenshots)

---

## About the Project

This To-Do application serves as a clear example of how to separate application logic from the UI layer. Instead of managing state with scattered useState hooks (isLoading, isError, data), all logic is centralized in a single, predictable state machine.

The UI is a direct function of the **machine**'s current **state**. User interactions (like clicking a button or typing in a form) are treated as **events** that are sent to the **machine**, which then determines the next **state** and any actions to perform. This declarative approach makes the application's behavior easy to understand, test, and debug.

## Technologies Used

- **Next.js**: _React framework for building the UI._
- **JavaScript**: _Programming language used for the entire application._
- **XState (v5)**: _Core library for creating state machines and statecharts to manage application logic._
- **React**: _The library for building UI._
- **CSS**: _For styling the application via global.css._

## State Machine Diagram

The entire application logic is encapsulated in the state machine below. It visually represents all possible **states**, the **events** that cause **transitions** between them, and the **actions** that occur.

Machine states:

- **Loading ToDos**: Initial state where the application fetches the initial list of toDos.
- **ToDos Loaded**: Primary "idle" state where the user can see the list and choose to create or delete items.
- **Creating new ToDo**: A nested state that handles showing the form and saving the new to-do.
- **Deleting ToDo**: Handles the deletion of a to-do item.
- **Loading ToDos errored / Deleting Errored**: Handle any errors during asynchronous operations.

_For interactive simulation of the state machine diagram_ [here](https://stately.ai/registry/editor/a1b5e80f-53b4-480a-a782-53328a56b740?machineId=93ff0330-d2be-47d9-b12c-0222497348d1&mode=Simulate).

![image_alt](https://github.com/jorgepiconjr/ToDo-Statechart/blob/master/src/app/Statechart.png)

## Key Features

- **State-Driven UI**: The UI is a pure reflection of the machine's current state. There are no conflicting boolean flags; the view for "loading," "loaded," "editing," and "error" are rendered based on a single, authoritative state value.
- **Declarative Logic**: The entire flow of the application is defined declaratively in one place (machines/todoAppMachine.js), making it easy to reason about.
- **Decoupled Architecture**: The business logic (the state machine) is completely independent of the UI framework (React). The React component simply provides implementations for the machine's actors (services) like loadTodos and saveTodo.
- **Predictable State Transitions**: Every change in the application is triggered by an explicit event, ensuring there are no unexpected side effects.
- **Robust Error Handling**: Each asynchronous operation has defined onDone and onError paths, making error handling predictable and straightforward.

## Example procedure

Here is a walkthrough of a typical user session:

1. **Initial Load**: The application starts and the machine enters the Loading ToDos state. It invokes the loadTodos actor to fetch the initial data.
2. **Display List**: On successful data fetching, the machine transitions to the ToDos Loaded state. The UI updates to display the list of to-dos.
3. **Add a ToDo**: The user clicks the "Add ToDo" button.
- This sends a Create new event to the machine.
- The machine transitions to the Creating new ToDo.Showing form input state.
- The UI conditionally renders an input form.
4. **Type and Submit**:
- As the user types, Form input changed events are sent to update the createNewFormInput value in the machine's context.
- The user hits "Enter," which submits the form and sends a Submit event.
5. **Save and Reload**:
- The machine transitions to the Saving ToDo state and invokes the saveTodo actor.
- Upon successful saving, the machine transitions back to the Loading ToDos state to refresh the list, ensuring the new item is displayed.
6. **Delete a ToDo**:
- The user clicks the "Delete" button next to an item.
- This sends a Delete event with the specific todo as a payload.
- The machine transitions to the Deleting ToDo state, invokes the deleteTodo actor, and then reloads the list.

## Screenshots

### Home
Main application view showing the list of current ToDos, current state of machine and the button to add a new ToDo.
![image_alt](https://github.com/jorgepiconjr/ToDo-Statechart/blob/master/src/app/home-page.png)

### Add ToDo
The form for adding a new To-Do, which appears after clicking the "Add ToDo" button.
![image_alt](https://github.com/jorgepiconjr/ToDo-Statechart/blob/master/src/app/add-new.png)

### Loading ToDo list
![image_alt](https://github.com/jorgepiconjr/ToDo-Statechart/blob/master/src/app/loading.png)

### Delete ToDo
![image_alt](https://github.com/jorgepiconjr/ToDo-Statechart/blob/master/src/app/todo-deleted.png)

---
---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

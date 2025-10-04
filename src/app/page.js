"use client";
import { useMachine } from "@xstate/react";
import { fromPromise } from "xstate";
import todoAppMachine from "../../machines/todoAppMachine";

const todos = new Set(["Take a shower", "Code", "Sleep"]);

export default function Home() {
  const providedMachine = todoAppMachine.provide({
    actors: {
      loadTodos: fromPromise(async () => {
        return Array.from(todos);
      }),
      saveTodo: fromPromise(async ({ input }) => {
        todos.add(input.text);
      }),
      deleteTodo: fromPromise(async ({ input }) => {
        todos.delete(input);
      })
    }
  });

  const [state, send] = useMachine(providedMachine);

  return (
    <div className="todo-page">
      <div className="todo-container">
        <div className="todo-header">
          <h1 className="todo-title">ToDo List</h1>
          <p>Machine State: <span className="todo-state-badge">{JSON.stringify(state.value)}</span></p>
        </div>

        {state.matches("Loading ToDos") && (
          <div className="todo-card" aria-busy="true">
            <div className="todo-loading-row">
              <span className="todo-spinner" />
              <span>Loading your tasks…</span>
            </div>
          </div>
        )}

        {state.matches("ToDos Loaded") && (
          <div className="todo-card">
            {state.context.todos.length === 0 ? (
              <div style={{ color: "#9ca3af", padding: "6px 2px" }}>
                Nothing here yet. Click “Add ToDo” to create your first task.
              </div>
            ) : (
              <ol className="todo-list">
                {state.context.todos.map((todo) => (
                  <li key={todo} className="todo-li">
                    <div className="todo-li-inner">
                      <span className="todo-text">{todo}</span>
                      <button
                        type="button"
                        aria-label={`Delete ${todo}`}
                        onClick={() => send({ type: "Delete", todo })}
                        className="todo-delete-btn"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            )}

            <div className="todo-add-row">
              <button onClick={() => send({ type: "Create new" })} className="todo-primary-btn">
                + Add ToDo
              </button>
            </div>
          </div>
        )}

        {state.matches("Creating new ToDo.Showing form input") && (
          <>
            <div className="todo-card">
              {state.context.todos.length === 0 ? (
                <div style={{ color: "#9ca3af", padding: "6px 2px" }}>
                  Nothing here yet. Click “Add ToDo” to create your first task.
                </div>
              ) : (
                <ol className="todo-list">
                  {state.context.todos.map((todo) => (
                    <li key={todo} className="todo-li">
                      <div className="todo-li-inner">
                        <span className="todo-text">{todo}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              )}
              <div className="todo-add-row">
              </div>
            </div>
            <br />
            <div className="todo-card">
              <h3 className="todo-section-title">Add a new ToDo</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send({ type: "Submit" });
                }}
              >
                <input
                  autoFocus
                  placeholder="Type a task and press Enter…"
                  className="todo-input"
                  value={state.context.createNewFormInput ?? ""}
                  onChange={(e) => send({ type: "Form input changed", value: e.target.value })}
                />
                <div className="todo-helper">Press Enter to save</div>
              </form>
            </div>
          </>
        )}

        {state.matches("Deleting Errored") && (
          <div className="todo-card">
            <div role="alert" className="todo-error">
              Error: {state.context.error}
            </div>
            <button onClick={() => send({ type: "Speed Up" })} className="todo-retry-btn">
              Retry
            </button>
          </div>
        )}

        {state.matches("Loading ToDos errored") && (
          <div className="todo-card">
            <div role="alert" className="todo-error">
              Error: {state.context.error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
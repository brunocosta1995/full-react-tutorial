const redux = require("redux");

const reducerCounter = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
    };
  }
  return state;
};

const store = redux.createStore(reducerCounter);

const subscriberCounter = () => {
  const counterStore = store.getState();
  console.log(counterStore);
};

store.subscribe(subscriberCounter);

store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });

# Custom React Hooks

Feel free to explore and integrate these custom hooks into your own React projects! 😊

## How to Navigate to the Hooks

To access these custom hooks, navigate to `src/utils/customHooks` and copy paste away 📋🚀
.

## Hooks



### useWindowDimensions

The `useWindowDimensions` hook provides the current width and height of the browser window, allowing you to create responsive and adaptable user interfaces.

```jsx
function Example() {
  const { width, height } = useWindowDimensions();

  return (
    <div>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
      {width > 720 ? <p>Big screen</p> : <p>Small screen</p>}
    </div>
  );
}

export default Example;
```

###useLocalStorage

The `useLocalStorage` hook is a handy tool that allows you to work with your browser's localStorage, making it easy to store and retrieve data. It's a versatile tool that can be useful in various scenarios.

## How it Works

The hook takes two important parameters:

1. **Key**: A key is like a unique name or identifier for your data. It's a string that helps you find your stored information.

2. **Initial Value**: This is the default value you provide. If there's no data stored under the specified key in localStorage, the hook will use this initial value as a fallback.

When you use the `useLocalStorage` hook, it follows these steps:

1. It checks if there's already data stored in localStorage under the given key.

2. If there's data, it uses that data as the initial value for your component's state.

3. It provides you with two essential things:

   - The current value of the stored data.
   - A function called `setStoredValue` that lets you change and save the data back to localStorage.

```jsx
import React from 'react';
import useLocalStorage from './utils/customHooks/useLocalStorage'; // Adjust the import path

function Example() {
  // Usage of useLocalStorage to store and retrieve data
  const [storedValue, setStoredValue] = useLocalStorage('myKey', 'default-value');

  const handleChange = (e) => {
    setStoredValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={storedValue}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>Stored Value: {storedValue}</p>
    </div>
  );
}

export default Example;
```

## Use Cases

The `useLocalStorage` hook has a wide range of applications:

### User Settings

You can use it to store and retrieve user preferences, such as their chosen theme, language, or any other settings that make your app more personalized.

### Form Data

Imagine users partially filling out a form and returning later to complete it. You can use this hook to store their progress, ensuring they don't lose their input.

### Caching

If your app frequently fetches data from an API or has data that doesn't change often, you can store it in localStorage to minimize redundant network requests and speed up your app.

### Remember Me Functionality

For login systems, the hook can help you remember users by storing tokens or user IDs, enabling the "remember me" feature.

### App State

It's also useful for saving and restoring parts of your app's state. This provides a seamless user experience, even when users refresh the page or return to your app.

In summary, the `useLocalStorage` hook simplifies working with browser storage and proves invaluable for persisting data across page refreshes or user sessions. It's a powerful tool for enhancing the user experience in your web applications.
<br>


### useMousePointer

A React custom hook to track the mouse pointer's current coordinates on the screen.

## Example

```jsx
import React from 'react';
import useMousePointer from './useMousePointer';

function MyComponent() {
  const { x, y } = useMousePointer();

  return (
    <div>
      <p>Mouse X: {x}</p>
      <p>Mouse Y: {y}</p>
    </div>
  );
}

export default MyComponent;
```
# Common Use Cases for `useMousePointer`

The `useMousePointer` hook is versatile and can be useful in various scenarios, including:

1. **Tracking Mouse Cursor Positions:** You can use this hook to keep track of the current coordinates of the mouse cursor on the screen. This information is valuable for creating interactive components that respond to mouse movements.

2. **Implementing Mouse-Dependent Features:** When you need to implement features that depend on mouse interactions, such as tooltips or pop-up menus triggered by hovering over elements, the `useMousePointer` hook can provide the mouse's position to facilitate these interactions.

3. **Creating Visual Effects:** If you want to add visual effects or animations that follow the mouse pointer, this hook is an excellent choice. You can use the mouse coordinates to update the position of elements, creating dynamic and engaging user experiences.

<br>

# `useCycle` Custom React Hook

The `useCycle` hook is a custom React hook that allows you to cycle through an array of values in a circular manner. It provides functions to move to the previous and next values in the array.

## Example

```jsx
import React from 'react';
import useCycle from './useCycle'; // Import your custom hook

function Example() {
  const { currentValue, cycleToPrevValue, cycleToNextValue } = useCycle([
    'Value 1',
    'Value 2',
    'Value 3',
  ]);

  return (
    <div>
      <p>Current Value: {currentValue}</p>
      <button onClick={cycleToPrevValue}>Cycle to Previous Value</button>
      <button onClick={cycleToNextValue}>Cycle to Next Value</button>
    </div>
  );
}
```
# Common Use Cases

The `useCycle` hook can be useful in various scenarios:

1. **Navigation Menus**: Create a carousel-like navigation menu where users can cycle through options.

2. **Sliders and Carousels**: Implement image sliders or carousels where users can move forward and backward through images.

3. **Tabbed Interfaces**: Build tabbed user interfaces where users can switch between tabs in a circular manner.

4. **Game Development**: Create games with rotating options, such as quiz games or interactive puzzles.

5. **UI Components**: Enhance user interface components like dropdown menus or date pickers with circular navigation.

6. **Rotating Banners**: Implement rotating banners or advertisements on websites.

7. **Product Selection**: Allow users to cycle through product options or variants.

The `useCycle` hook simplifies the logic required to create circular navigation and makes it easy to add this functionality to various parts of your React applications.
export default Example;

<br>
more coming soon...

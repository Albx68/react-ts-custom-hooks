How to:

   navigate to src/utils/customHooks <br>
   Feel free to copy and integrate these hooks into your own projects! 😊"

   
Hooks:
<br>
   + The useWindowDimensions hook provides the current width and height of the browser window, allowing you to create responsive and adaptable user interfaces.


 
   ```
   function Example() {
  
     const { width, height } = useWindowDimensions();

        return (
          <div>
            <p>Width: {width}px</p>
            <p>Height: {height}px</p>
            { width > 720? <p>big screen</p> : <p>small screen</p> }
          </div>
        );
      }

   export default Example;
```
   use cases : One particular use case can be rendering content conditionally based on screen size

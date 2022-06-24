import React, {useState, useEffect, useReducer, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const lakeList = [
  "Echo Lake",
  "Maud lake",
  "Cascade Lake"
];
const lakeObjectList = [
  {id: "1", name: "Echo", trailhead: "Echo"},
  {id: "2", name: "Maud", trailhead: "Wrights"},
  {id: "3", name: "Velma", trailhead: "Bayview"}
];
const keyDemoList = [1,2,3,4,5]
//component should be starting with capital letter
//props object passed - props provides the data to be displayed by the component
function Hello(props){
  console.log(Object.keys(props));
  return (
    <div>
      <h1>Welcome to {props.library}</h1>
      <p>{props.message} props string</p>
      <p>{props.number} number value prop in jsx curly braces</p>
      <p>{Object.keys(props).length} Props Total</p>
    </div>
  );
}

function PropsByName({library, message, number}){
  // console.log(Object.keys(props));
  return (
    <div>
      <h1>Welcome to {library}</h1>
      <p>{message} props string</p>
      <p>{number} number value prop in jsx curly braces</p>
      {/* <p>{Object.keys(props).length} Props Total</p> */}
    </div>
  );
}

function Lake({name}){
  return(<h1>{name}</h1>)
}
function App(){
  return (
  <div>
    <Lake name="Lake Tahoe" />
    <Lake name="Angora Lake" />
    <Lake name="Shirly Lake" />
    </div>
  );
  }

  function LakeList({lakes}){
    return(
      <div>
      <h2>Rendering items from list - lakes</h2>
      <ul>
        {lakes.map( (lake, index) =>
          (
            <li key={index}>{lake}</li>
          )
          )}
      </ul>
      </div>
    );
  }

  function ListOfNumbersAsKeys({numbers}){
    return(
      numbers.map(number =>(
        <h3 key={number.toString()}>{number}</h3>
      ))
    );
  }

  function RenderFromListOfObjects({lakes}){
return(
  <div>
    <h2>Rendering items from list of objects - lakes</h2>
    {lakes.map(lake =>(
      <div key={lake.id}>
      <h2>{lake.name}</h2>
      <p>Accessed by: {lake.trailhead}</p>
      </div>
    ))}
  </div>
);
  }

  function LakeTemp({name}){
    return(
      <div>
        <h3>Visit {name}!</h3>
      </div>
    );
  }

  function SkiResort({name}){
    return(
      <div>
        <h3>Visit {name}</h3>
      </div>
    );
  }
  function ConditionalRendering(props){    
      // if(props.season === "summer")
      // {
      //  return <LakeTemp />;
      // }                  
      // else if(props.season ==="winter")
      // {
      //   return <SkiResort/>;
      // }

      //Using terinary operator
      return(
<React.Fragment>
<h2>ConditionalRendering</h2>
{props.season === "summer" ? (
  <LakeTemp name="Jenny Lake" />
): props.season === "winter" ?(
  <SkiResort name="JHMR"/>
): (
<h1> Come back in winter or summer</h1>
)}
</React.Fragment>
      );
  }

  //Array destructuring - first, second are names for indexes
  const [first, second] = ["popcorns",
  "pretzels","pineapple"]

  console.log(first);
  console.log(second);

  //last item the array, if you don't want names for first and second then leave blank and give comma placeholders
  const [,,fruit]  = ["mango", "apple", "grape"]
console.log(fruit);

//Using useState - hook from react library {useState}
// A hook is a function that allows adding functionality to the component

function AppComponent(){
  const [status, setStatus] = useState("Open");//useState is the built-in hook, we can use to handle state changes in our application
//status is state value, 'setStatus' is the function to chnage the state value

const [manager, setManager] = useState("Alex");
const [year, setYear] = useState(2050);

  return(
    <>//short hand for React.Fragment
    <div>
    <h1>{year}</h1>
      <button onClick={()=>setYear(year +1)}> New year!</button>
    </div>
    <div>
      <h1>Manager on Duty: {manager}</h1>
      <button onClick={()=>setManager("Rachel")}> New Manager</button>
    </div>
    <div>
      <h1>Status: {status}</h1>
      <button onClick={()=> setStatus("Open")}>
        Open
      </button>
      <button onClick={() => setStatus("Back in 5")}>
        Break
      </button>
      <button onClick={()=> setStatus("Closed")}>
        Closed
      </button>
    </div>
    </>
  );
}

//React will re-renders the component tree whenever the state changes
//useEffect will be called after these renders
function CheckBox(){
  const [checked, setChecked] = useState(false);
  //if we want to see the value of checked before changing
  //alert(`checked: ${checked.toString()}`);//we can place this alert to check the value

  //Or we can use useEffects hook - useEffect is going to perform side effects inside out component
  //in components anything other than returning UI are called effects e.g. console logging, any native api or browser interaction, alert, making app mre interactive
useEffect(()=> {
  alert(`checked: ${checked.toString()}`);
});
  return(
    <>
    <input type="checkbox" onClick={()=> setChecked(checked => !checked)}/>
      {checked? "checked": "notChecked"}      
    </>
  );
}

function AppComponent2(){
  const [val, setVal] = useState("");
  const [val2, setVal2] = useState("");


  useEffect(()=>{
    console.log(`field 1: ${val}`);
  }, [val]);//second parameter is dependency array - respond only for changes in val and not val2
//dependency arrays are important for working with react hooks, it is going to allow for smart rendering and won't trigger unnecessary re-renders if we pass the right values to the dependency array
  useEffect(()=>{
    console.log(`field 2: ${val2}`);
  }, [val2]);

  return (
    <>
    <label>Favourite Phrase:
    <input value={val} onChange={e => setVal(e.target.value)} />
    </label>
<br/>
    <label>Second Favourite Phrase:
    <input value={val2} onChange={e => setVal2(e.target.value)} />
    </label>
    </>
  );
}

//Fetch data from api - using useEffect
//displaying data from an api
function GitHubUser({login}){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);//handling error state for async api call
  const [loading, setLoading] = useState(false);//handling load state for async api call

  useEffect(()=>{
    setLoading(true);
    fetch(`https://api.github.com/users/${login}`)
    .then(response => response.json())
    .then(setData)//will call setData function with new data , this is a short hand for .then(data => setData(data))
    .then(() => setLoading(false))
    .catch(setError);
  }, []);//passing empty array as dependency to make sure the api is called once when the application first renders. prevents from doing multiple api calls

  if(loading) return <h1>Loading...</h1>
  if(error) return <pre>{JSON.stringify(error)}</pre>


  if(data){
    return (
      // <pre>{JSON.stringify(data, null, 2)}</pre>//nulll an 2 makes the data formatted on screen
      <GitHubUserUiComponent name={data.name} location = {data.location} avatar={data.avatar}/>
    )
  }

  return <h1>Data</h1>;
}

function GitHubUserUiComponent({name, location, avatar}){
  return(
    <div>
      <h1>{name}</h1>
      <p>{location}</p>
      <img src={avatar} height={150} alt ={name} />
    </div>
  );
}

//useReducer hook - 
function CheckBox2(){
  const [checked, toggle] = useReducer(checked => !checked, false);//instead of putting the logic in onchanged we can use the simple fucntion abstracted in a reducer function which always provides the same functionality
  
useEffect(()=> {
  console.log(`checked: ${checked.toString()}`);
});
  return(
    <>
    <input type="checkbox" value={checked} onChange={ 
      // setChecked(checked => !checked)//every time setChecked is called, are sending this toggle checked => !checked, everytime we are expecting the developer to sned the right value, instead we can provide function as toggle using useReducer 
      toggle
      }/>
      {checked? "checked": "notChecked"}      
    </>
  );
}

//useRef hook - will help reach out an indiviual element and checkin what its value is
//This is a uncontrolled component - create a 
function FormUnControlledComponent(){
  const txtTitle = useRef();//useref usage denotes an uncontrolled component, where we managing form elements outside of state
  const hexColor = useRef();

  console.log(txtTitle);

  const submit = (e) => {
    e.preventDefault();

    const title = txtTitle.current.value;
    const color = hexColor.current.value;
    alert(`${title}, ${color}`);

    txtTitle.current.value = "";
    hexColor.current.value = "";
  };

return(
  <form onSubmit={submit}>
    <input ref={txtTitle} type="text" placeholder ="color title..."/>
    <input ref={hexColor} type ="color" />
    <button>ADD</button>
  </form>
);
}

function FormControlledComponent(){
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000");
  
  const submit = (e) => {
    e.preventDefault();
  
    alert(`${title}, ${color}`);    
    setTitle("");
    setColor("#000000");
  };

return(
  <form onSubmit={submit}>
    <input value={title} 
    onChange={(event)=>{
      setTitle(event.target.value) 
    }}
    type="text" placeholder ="color title..."/>
    <input value={color}
    onChange={(event)=>{
      setColor(event.target.value);
    }}
     type ="color" />
    <button>ADD</button>
  </form>
);
}

//Custom hooks - always start with keywaord "use"
//useHooks.com
function useInput(initialValue){
 const [value, setValue] = useState(initialValue);
 return [//Can implement anyway we want
  {
    value, 
    onChange: e => setValue(e.target.value)
  },
  () => setValue(initialValue)//clean up value
 ]
}

//react-hook-form.com
//formik.org
function FormControlledComponentWithCustomHook(){
  const [titleProps, resetTitle] = useInput("");
  const [colorProps, resetColor] = useState("#000000");
  
  const submit = (e) => {
    e.preventDefault();
  
    alert(`${titleProps.value}, ${colorProps.value}`);    
    resetTitle();
    resetColor();
  };

return(
  <form onSubmit={submit}>
    <input 
    {...titleProps}//pushing all of the values in titleProps, spreading all of the properties i.e. instead of writing value= and onchanged= in this input field, we are embedding these properties from hook. use sparinglig this implemeantation,  We can use here as the titleprops has few properties needed
    
    type="text" placeholder ="color title..."/>
    <input {...colorProps}
     type ="color" />
    <button>ADD</button>
  </form>
);
}
root.render(
  // React.createElement("div", {style:{color:"blue"}}, React.createElement("h1", null, "Hello!"))
  <div>
  <Hello library="Vue" message="have fun!" number ={5}/>
  <PropsByName library="React" message="have fun!" number ={5}/>
  <App/>
  <LakeList lakes={lakeList}/>
  <RenderFromListOfObjects lakes={lakeObjectList}/>
  <ListOfNumbersAsKeys numbers={keyDemoList} />  
  <ConditionalRendering  season="winter"/>
  <AppComponent/>
  <CheckBox/>
  <AppComponent2/>
  {/* <GitHubUser login="moonhighway"/> */}
  <CheckBox2/>
  <FormUnControlledComponent/>
  <FormControlledComponent/>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

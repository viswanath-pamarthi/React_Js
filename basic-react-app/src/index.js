import React from 'react';
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
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

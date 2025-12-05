import { useState } from "react";


type Props = {
    title: string;
    description: string;
}

export default function card({title, description}: Props) {
  const[AmountOfClicks, setAmountOfClicks]= useState(0);
  let style = AmountOfClicks > 5 ? "bg-red-400" : "";

  return (
    <div className={`border ${style}`} onClick={() => 
      {
        //alert("you clicked");
        setAmountOfClicks(AmountOfClicks + 1);
      }
    
      

      }>


<h2>{title}</h2>
<p>{description}</p>
    <div>Amount of Clicks: {AmountOfClicks}</div>
    </div>
  )
}
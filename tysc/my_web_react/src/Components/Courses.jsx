import { useState } from "react";
export default function Courses(){
    //useState --- Hook -- In react if anything starts with use keyword it means it's a HOOK 
   const[getHeading , setHeading] = useState("Couses are here...");
   const[getCourses , setCourses] = useState([]);
    function handleHeadingChange()
    {
            setCourses(["AI Crash Course","Python in 10 days"])
    }

return(<>
<div className="border p-1">
<h2 className="text-blue-950 border-2 font-bold"> {getHeading} </h2>
<h1 className="flex-wrap"> {getCourses} </h1>
<button onClick={handleHeadingChange} className="bg-amber-700 text-white px-2 py-1 rounded mt-3 cursor-pointer">Upcoming Courses</button>
</div>

</>);

}
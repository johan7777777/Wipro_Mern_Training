import MyButton from "./Button";

export default function Card(obj)
{
    return (
        
        <div className=" border border-gray-300 w-70 rounded p-2 m-2 
         bg-gray-50 shadow-lg flex flex-col gap-4 transition-all duration-200 cursor-pointer hover:bg-neutral-300 ">
            <div className="card_header">
                <h className="font-bold">{obj.cardTitle}</h>
            </div>
            <div className = "card_body">
                <h> {obj.cardDescription}</h>
            </div>
            <div  className="card_footer">
                 <MyButton title={"Click Here.."}></MyButton>
                 <MyButton title ={"Read More.."}></MyButton>
            </div>
             

        
        </div>


    )
}
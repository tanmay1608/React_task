import { useState,useEffect } from "react";
import Card from "./Card";
import { IMAGE_ARRAY } from "../utils/constants";
import ScoreBoard from "./ScoreBoard";

const PlayingArea = () => {
  const [imageArray,setImageArray] = useState(IMAGE_ARRAY.sort(()=>Math.random()-0.5));
  const [prevCard,setPrevCard]=useState(null);
  const [scoreCount,setScoreCount]=useState(0);
  const [clickCount,setClickCount]=useState(0);
  const [timer,setTimer]=useState(0);
  const [isGameOver,setIsGameOver]=useState(false);

    console.log("rendered");

    //   const timerId=  setInterval(() => {
    // console.log("inside",timer)
    //     if(timer === 10){
    //         alert("Game Over");
    //         clearInterval(timerId);
    //         return;
    //     }
    //     setTimer(prev => prev+1);
    //   }, 1000);
  useEffect(() => {


  const timerId=  setInterval(() => {
    
        setTimer(prev => {

            if(prev === 10){
                setIsGameOver(true);
                clearInterval(timerId);
                return prev;
            }
            else{
                return prev+1;            
            }
        });
      }, 1000);
    
    return () => {
        clearInterval(timerId);
    };
  }, []);

  const handleOnClick=(index)=>{

    if(imageArray[index].state === "correct" || imageArray[index].state === "active" ) {

        alert("already selected");
        return;
    };

    if(prevCard){
        
        if(prevCard.item.id === imageArray[index].id){

            imageArray[index].state="correct";
            imageArray[prevCard.index].state="correct";
            setImageArray([...imageArray]);
            setPrevCard(null);
            setScoreCount(prev=>prev+1);
        }
        else{

            imageArray[index].state="wrong";
            imageArray[prevCard.index].state="wrong";
            setImageArray([...imageArray]);
            setPrevCard(null);
            setTimeout(() => {
                imageArray[index].state="";
                imageArray[prevCard.index].state="";
                setImageArray([...imageArray]);
                
            }, 1000);
        }
        setClickCount(prev=>prev+1);
    }
    else{
        setPrevCard({item:imageArray[index],index:index});
        imageArray[index].state="active";
        setImageArray([...imageArray]);
    }
        
  }

  return (
    <div className="bg-blue-400 mt-8 flex ">
        {

            !isGameOver ? (
                <>
                 <div className=" bg-blue-400 p-10  grid grid-cols-4 grid-rows-3 gap-2">
                {imageArray.map((item, index) => (
                  <Card key={index} index={index} item={item} handleOnClick={handleOnClick}/>
                ))}
              </div>
            <ScoreBoard scoreCount={scoreCount} clickCount={clickCount} timer={timer}/>
            </>
        
        ) :<div>Game Over</div>

        }
     
    </div>
  );
};

export default PlayingArea;

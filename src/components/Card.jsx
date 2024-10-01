const Card = ({item,handleOnClick,index}) => {
  return <div className={`${ item.state === "correct" ? "bg-green-500": item.state === "wrong" ? "bg-red-500":"bg-blue-500"} w-40 h-40 p-5`} onClick={()=>handleOnClick(index)} >
    <img src={item.src} alt="image not found" className={`w-full h-full object-contain ${item.state !== "" ? "scale-100" :"scale-0"}`}/>
  </div>;
};

export default Card;

const ScoreBoard = ({ clickCount, scoreCount,timer }) => {
  return (
    <div className="p-10 flex flex-col items-center">
      <div className="flex items-center  w-full justify-end ">
        <div className="w-[50px] h-[50px] flex m-2 justify-center items-center rounded-full bg-black">
          <p className="text-white p-10">{timer}</p>
        </div>
      </div>
      <div className="flex items-center  w-full justify-end">
        <p>No. of clicks: </p>
        <div className="w-[50px] h-[50px] flex m-2 justify-center items-center rounded-full bg-red-500" >
          <p className="text-white p-10">{clickCount}</p>
        </div>
      </div>

      <div className="flex items-center w-full  justify-end">
      <p>Score: </p>
        <div className="w-[50px] h-[50px] flex m-2 justify-center items-center rounded-full bg-red-500">
          <p className="text-white p-10">{scoreCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;

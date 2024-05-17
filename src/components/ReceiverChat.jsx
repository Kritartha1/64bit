import React from 'react'

const ReceiverChat=({Text})=> {
  return (
    <div className='bg-[##cff0cf] relative p-3.5 bg-white ml-2 mr-7 my-1 rounded flex self-start ' style={{overflowWrap:"anywhere"}}>
              {Text}
              <div className='absolute h-full w-2 bg-[#2A2D3F]' style={{left: "-3px",
    borderRadius: "19px",
    top: "1px"}}></div>

          </div>
  )
}

export default ReceiverChat
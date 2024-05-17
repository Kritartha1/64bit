import React from 'react'


const SenderChat=({Text})=> {
  return (
    <div className='bg-[#cff0cf] relative p-3.5 bg-white mr-2 ml-7 my-1 rounded flex self-end ' style={{overflowWrap:"anywhere"}}>
              {Text}

              <div className='absolute h-full w-2 bg-[#2A2D3F] ' style={{right: "-3px",borderRadius: "19px",top: "1px"}}
    ></div>
          </div>
  )
}

export default SenderChat
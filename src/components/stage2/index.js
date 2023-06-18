import React, { useContext } from 'react'

import { Context } from '../../context'

const Stage2 = () => {
  const context = useContext(Context)

  return (
    <>
      <div className='result_wrapper'>
        <h3>The looser is:</h3>
        <div>{context.state.result}</div>
      </div>
      <div
        className='action_buttons'
        onClick={() => context.resetGame()}
      >Start Over</div>
      <div
        className='action_buttons btn_2'
        onClick={() => context.getNewLooser()}
      >Get new looser</div>
    </>
  )
}

export default Stage2

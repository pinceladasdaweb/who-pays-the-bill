import { Button, Form, Alert } from 'react-bootstrap'
import React, { useState, useContext, useRef } from 'react'

import { Context } from '../../context'

const Stage1 = () => {
  const textInput = useRef()
  const context = useContext(Context)
  const [{ 0: error, 1: message }, setError] = useState([false, ''])

  const validateInput = (value) => {
    if (value === '') {
      setError([true, 'Sorry, you need to add something!'])
      return false
    }

    if (value.length <= 2) {
      setError([true, 'Sorry, you need 3 characters at least!'])
      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const value = textInput.current.value
    const validate = validateInput(value)

    if (validate) {
      setError([false, ''])
      context.addPlayer(value)
      textInput.current.value = ''
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit} className='mt-4'>
        { error ?
          <Alert>{message}</Alert>
        : null }

        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Add player name'
            name='player'
            ref={textInput}
          />
        </Form.Group>

        <Button className='miami' variant='primary' type='submit'>Add player</Button>

        { context.state.players && context.state.players.length > 0 ?
        <>
          <hr />
          <div>
            <ul className='list-group'>
              {
                context.state.players.map((player, index) => (
                  <li key={index} className='list-group-item list-group-item-action d-flex
                    justify-content-between align-items-center'>
                    {player}
                    <span
                      className='badge badge-danger'
                      onClick={() => context.removePlayer(index)}
                    >X</span>
                  </li>
                ))
              }
            </ul>
            <div
              className='action_buttons'
              onClick={() => context.next()}
            >Next</div>
          </div>
        </>
        : null }
      </Form>
    </>
  )
}

export default Stage1

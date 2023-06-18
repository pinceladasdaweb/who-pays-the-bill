import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Context = React.createContext()

class Provider extends Component {
  state = {
    stage: 1,
    players: [],
    result: ''
  }

  addPlayerHandler = (name) => {
    this.setState((prevState) => ({
      players: [
        ...prevState.players,
        name
      ]
    }))
  }

  removePlayerHandler = (index) => {
    const arr = this.state.players
    arr.splice(index, 1)

    this.setState({
      players: arr
    })
  }

  nextHandler = () => {
    const { players } = this.state

    if (players.length < 2) {
      toast.error('You nedd more than one player.')
    } else {
      this.setState({
        stage: 2
      }, () => {
        setTimeout(() => {
          this.generateLooser()
        }, 1000)
      })
    }
  }

  generateLooser = () => {
    const { players } = this.state

    this.setState({
      result: players[Math.floor(Math.random() * players.length)]
    })
  }

  resetGame = () => {
    this.setState({
      stage: 1,
      players: [],
      result: ''
    })
  }

  render () {
    return (
      <>
        <Context.Provider value={{
          state: this.state,
          addPlayer: this.addPlayerHandler,
          removePlayer: this.removePlayerHandler,
          next: this.nextHandler,
          getNewLooser: this.generateLooser,
          resetGame: this.resetGame
        }}>
          {this.props.children}
        </Context.Provider>
        <ToastContainer />
      </>
    )
  }
}

export {
  Context,
  Provider
}

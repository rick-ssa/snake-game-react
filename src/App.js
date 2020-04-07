import React, {useState, useEffect} from 'react';
import Board from './components/board'
import Snake from './components/snake'

import {STARTED,STOPED,PAUSED,OVER} from './js/constants.js'

import './global.css'

function App() {
  const [snakeBody, setSnakeBody] = useState([{left:8,top:8},{left:8,top:24}]);
  const [direction, setDirection] = useState('right');
  const [velocity, setVelocity] = useState(100);
  const [idTimeMove, setIdTimeMove] = useState(0)
  const [gameStatus,setGameStatus] = useState(STARTED)
  const [gameIsMounting, setGameIsMounting] = useState(true)

  useEffect(()=>{
    document.body.addEventListener('keydown',(e)=>changeDirection(e.key))
  },[])
  
  useEffect(()=>{
      if(!gameIsMounting){
        move()
        console.log('changedirection')
      } else {
        setGameIsMounting(false)
      }
  },[direction])

  useEffect(()=>{
    switch (gameStatus) {
      case PAUSED:
        console.log('game is paused')
        break;
      case STARTED:
        console.log('game is playing')
        break;
      case STOPED:
        console.log('game is stoped')
        break;
      default:
        console.log('game is over')
        break;
    }
  },[gameStatus])

  useEffect(()=>{
    if(gameStatus===STARTED) {
      setIdTimeMove(setTimeout(move,velocity))
      console.log('move')
    }

    
  },[snakeBody])

  function move() {
    let addLeft = 0;
    let addTop = 0;

    switch (direction) {
      case 'left': 
        addLeft = -16;
        break;
      case 'right':
        addLeft = 16;
        break;
      case 'up': 
        addTop =  -16;
        break;
      case 'down':
        addTop = 16;
        break;
    }


    clearTimeout(idTimeMove)
    followTheHead({left: snakeBody[0].left + addLeft, top: snakeBody[0].top + addTop})
  }

  function play() {
    console.log(gameStatus)
    if(gameStatus!==STARTED){
      setGameStatus(STARTED)
      move()
      console.log('play was invoked')
    }
  }

  function pause() {
    if(gameStatus!==PAUSED){
      clearTimeout(idTimeMove)
      setGameStatus(PAUSED)
      console.log('pause was invoked')
    }
  }

  function followTheHead(newHeadPosition) {
    setSnakeBody(()=>{
      return snakeBody.map((pos,index,arr)=>{
        if(!index) {
          return newHeadPosition;
        }
        return {left: arr[index - 1].left, top: arr[index-1].top}
      })
    })
  }

  function changeDirection(direction) {
    let pattern = /(?<=Arrow)\w+/
    
    let newDirection = pattern.exec(direction)

    if(newDirection){
      if(direction!==newDirection && gameStatus===STARTED) {
        newDirection = newDirection[0].toLowerCase()
        clearTimeout(idTimeMove)
        setDirection(newDirection)
      }
    }
  }

  return (
    <div className="App">
      <Board width = {'100vw'} height={'100vh'} />
      <Snake coords = {snakeBody} direction = {direction}/> 
      <button style={{position:'absolute', right:'5px', top:'8px'}} onClick = {play}>play</button>
      <button style={{position:'absolute', right:'5px', top:'24px'}} onClick = {pause}>pause</button>
    </div>
  );
}

export default App;

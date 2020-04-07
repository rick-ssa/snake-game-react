import React, {useState, useEffect} from 'react';
import Board from './components/board'
import Snake from './components/snake'

import {STARTED,STOPED,PAUSED,OVER} from './js/constants.js'

import './global.css'

function App() {
  const [snakeBody, setSnakeBody] = useState([{left:8,top:8}]);
  const [direction, setDirection] = useState('right');
  const [velocity, setVelocity] = useState(100);
  const [idTimeMove, setIdTimeMove] = useState(0)
  const [gameStatus,setGameStatus] = useState(STARTED)
  const [gameIsMounting, setGameIsMounting] = useState(true)

  useEffect(()=>{
    document.body.addEventListener('keydown',(e)=>changeDirection(e.keyCode))
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

    return ()=>clearTimeout(idTimeMove)
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

  function addSegment() {
    let newTop;
    let newLeft;
    let segment;
    if(snakeBody.length > 1) {
      clearTimeout(idTimeMove)
      newTop = 2 * snakeBody[snakeBody.length - 1].top -  snakeBody[snakeBody.length - 2].top 
      newLeft = 2 * snakeBody[snakeBody.length - 1].left -  snakeBody[snakeBody.length - 2].left 
    } else {
      switch(direction) {
        case 'up':
          newLeft = snakeBody[0].left
          newTop = snakeBody[0].top + 16
          break;
        case 'right':
          newLeft = snakeBody[0].left - 16
          newTop = snakeBody[0].top
          break;
        case 'down':
          newLeft = snakeBody[0].left
          newTop = snakeBody[0].top - 16
          break;
        case 'left':
          newLeft = snakeBody[0].left + 16
          newTop = snakeBody[0].top
          break;
      }
    }
    segment = {left:newLeft,top:newTop}
    setSnakeBody([...snakeBody,segment])
  }

  function changeDirection(dirNum ) {
    let newDirection;
    
    switch(dirNum) {
      case 37:
        newDirection = 'left';
        break;
      case 38:
        newDirection = 'up';
        break;
      case 39:
        newDirection = 'right';
        break;
      case 40:
        newDirection = 'down';
        break;
      default:
        newDirection = undefined
    }
    
    if(newDirection){
      if(gameStatus===STARTED) {
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
      <button style={{position:'absolute', right:'5px', top:'30px'}} onClick = {pause}>pause</button>
      <button style={{position:'absolute', right:'5px', top:'52px'}} onClick = {addSegment}>addseg</button>
    </div>
  );
}

export default App;

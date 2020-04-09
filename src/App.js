import React, {useState, useEffect} from 'react';
import Board from './components/board';
import Snake from './components/snake';
import ControllPanel from './components/controllPanel';
import {snakeIsInTheArea} from './js/snakeFunctions';
import DisplayFood from   './components/displayFood';
import MessagePanel from './components/messagePanel';

import {STARTED,STOPED,PAUSED,OVER} from './js/constants.js'

import './global.css'

function App() {
  const [snakeBody, setSnakeBody] = useState([{left:8,top:8}]);
  const [direction, setDirection] = useState('right');
  const [velocity, setVelocity] = useState(100);
  const [idTimeMove, setIdTimeMove] = useState(0)
  const [idTimeFood, setIdTimeFood] = useState(0)
  const [idTimeImageOn, setIdTimeImageOn] = useState(0);
  const [gameStatus,setGameStatus] = useState(STARTED)
  const [gameIsMounting, setGameIsMounting] = useState(true)
  const [topPanelControl] = useState('10px')
  const [areaInicialPanelControll, setAreaInicialPanelControll] = useState({})
  const [minTimer, setMinTimer] = useState(4)
  const [maxTimer, setMaxTimer] = useState(12)
  const [foodData, setFoodData] = useState({foodType: 'apple', foodSize: 20, foodColor: 'red', foodPosition:{left:808, top:40}})
  const [score, setScore] = useState(0)
  const [stringScore, setStringScore] = useState(0)
  const [messageOn, setMessageOn] = useState(false)
  const [imageOn, setImageOn] = useState(false);

  useEffect(()=>{
    let panelControl = document.getElementById('controll-panel')
    setAreaInicialPanelControll({
      left: panelControl.offsetLeft, 
      top: panelControl.offsetTop, 
      width:panelControl.offsetWidth,
      height: panelControl.offsetHeight
    })

    document.body.addEventListener('keydown',(e)=>{e.preventDefault();changeDirection(e.keyCode)})
    
    window.addEventListener('resize',()=>{
      setAreaInicialPanelControll({
        left: panelControl.offsetLeft, 
        top: panelControl.offsetTop, 
        width:panelControl.offsetWidth,
        height: panelControl.offsetHeight
      })
    })

    runRandomFood()
    console.log('mounted')
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

    if(gameStatus!==STARTED) {
      let panelControl = document.getElementById('controll-panel');
      panelControl.style.top = '8px';
    }
  },[gameStatus])

  useEffect(()=>{
    let panelControl = document.getElementById('controll-panel')
    
    if(gameStatus===STARTED) {
      if(snakeIsInTheArea(snakeBody,areaInicialPanelControll, 51,0,20,20,5,20)) {
        panelControl.style.top = '-32px'
        !messageOn && setMessageOn(true)
      } else {
        panelControl.style.top = '8px'
        messageOn && setMessageOn(false)
      }

      clearTimeout(idTimeMove)
      setIdTimeMove(setTimeout(move,velocity))

      if(snakeIsInTheArea(snakeBody,{left: foodData.foodPosition.left, top: foodData.foodPosition.top, width: foodData.foodSize, height: foodData.foodSize},0,0,-1,-1,-1,-1  )) {
        addSegment()
        setMessageOn(true)
        handleShowImage()
        setScore(score + 1)
        clearTimeout(idTimeFood)
        runRandomFood()
      }
        
      console.log('move')
    }

    return ()=>clearTimeout(idTimeMove)
  },[snakeBody])

  useEffect(()=>{
    formatScore()
  },[score])

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
      runRandomFood();
      console.log('play was invoked')
    }
  }

  function pause() {
    if(gameStatus!==PAUSED){
      clearTimeout(idTimeMove)
      clearTimeout(idTimeFood)
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

  function changeDirection(dirNum) {
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

  function runRandomFood() {
    let time = Math.floor(Math.random() * (maxTimer - minTimer + 1) + minTimer) * 1000
    let lft = Math.floor((Math.random() * 800)/16) * 16 + 8
    let tp = Math.floor((Math.random() * 500)/16) * 16 + 8
    setFoodData({...foodData, foodPosition: {left: lft, top: tp}})
    setIdTimeFood(setTimeout(runRandomFood,time))
  }

  function formatScore () {
    let strScore = score.toString()
    let numZeros = 5 - strScore.length
    
    for(let i=0; i < numZeros; i++) {
      strScore = '0' + strScore;
    }

    setStringScore(strScore)
  }

  function handleShowImage() {
    setImageOn(true)
    clearTimeout(setIdTimeImageOn)
    setIdTimeImageOn(setTimeout(()=>setImageOn(false),800))
  }

  return (
    <div className="App">
      <Board width = {'100vw'} height={'100vh'} />
      <MessagePanel message = 'crtl + p = pause' showImage = {imageOn} textOn={messageOn}/>
      <Snake coords = {snakeBody} direction = {direction}/> 
      <ControllPanel top={topPanelControl} score={stringScore} onPause={pause} onPlay={play} onStop={()=>console.log('stop has pressed')}/>
      <DisplayFood area = {{width: '1200px', height: '500px'}} size={foodData.foodSize} color = {foodData.foodColor} foodType = {foodData.foodType} position = {foodData.foodPosition} />
    </div>
  );
}

export default App;

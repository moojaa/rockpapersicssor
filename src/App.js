import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import Box from './component/Box'
import { Col, Container, Row } from 'react-bootstrap';
import { useSpring, animated} from '@react-spring/web';

//박스 2개(타이틀,사진정보,결과값)
//가위,바위,보 선택 버튼
//버튼 클릭시 클릭한 값 박스에 보임
//컴퓨터는 랜덤하게 아이템 선택
//위의 결과를 가지고 누가 이겼는지 승패검증
//승패 결과에 따라 박스 테두리 변경(승리시-초록,패배-빨강,비김-검정)

const CardHoverEffect = ({children})=>{
  const [hovered,setHovered] = useState(false);
  const {scale} = useSpring({
    scale: hovered ? 1.1 :1,
  })
  return(
    <animated.button 
    className='button-style'
    onMouseEnter={()=>setHovered(true)}
    onMouseLeave={()=>setHovered(false)}
    style={{transform:scale.to(s=>`scale(${s})`)}}
    >
      {children}
    </animated.button>
  )
}

const choice = {
  rock: {
    name: "rock",
    img: "/img/rock.png"
  },
  scissors: {
    name: "scissors",
    img: "/img/scissors.png"
  },
  paper: {
    name: "paper",
    img: "/img/paper.png"
  },
}
const imgURLs = Object.values(choice).map(item => item.img);

console.log(imgURLs)

function App() {
  const [userSelect, setUserSelect] = useState(null)
  const [computerSelect, setComputerSelect] = useState(null)
  const [result, setResult] = useState("")
  const [comResult, setComResult] = useState("")
  const [flipped,setFlipped] = useState(false)
  
  // const [ImgIndex,setImgIndex]= useState(0)

  // useEffect(()=>{
  //   const interval = setInterval(()=>{
  //     setImgIndex((prevIndex)=> (prevIndex +1)% images.length)
  //   },200)
  //   return()=>clearInterval(interval)
  // },[images.length])

  const play = (userChoice) => {
    setUserSelect(choice[userChoice])
    let computerChoice = randomChoice()
    setComputerSelect(computerChoice)
    setResult(judgement(choice[userChoice], computerChoice))
    setComResult(comJudge(judgement(choice[userChoice], computerChoice)))
    setFlipped(state => !state)
  }

  const judgement = (user, computer) => {
    if (user.name === computer.name) {
      return "비김"
    } else if (user.name === "rock") return computer.name === "scissors" ? "승리" : "패배"
    else if (user.name === "scissors") return computer.name === "paper" ? "승리" : "패배"
    else if (user.name === "paper") return computer.name === "rock" ? "승리" : "패배"
  }

  const comJudge = (result) => {
    if (result === "비김") {
      return "비김"
    } else if (result === "승리") return "패배"
    else if (result === "패배") return "승리"
  }

  const randomChoice = () => {
    let itemArray = Object.keys(choice); //Object.keys객체의 키값을 뽑아서 배열로 만들어준다
    let randomItem = Math.floor(Math.random() * itemArray.length)
    let final = itemArray[randomItem]
    return choice[final]
  }

  return (
    <div className='vh-100 text-white'>
      <Container>
        <Row>
          <Col lg={6} className='d-flex justify-content-center'>
            <Box title="you" item={userSelect} result={result} flipped={flipped} />
          </Col>
          <Col lg={6} className='d-flex justify-content-center'>
            <Box title="computer" item={computerSelect} result={comResult} flipped={flipped} />
          </Col>
        </Row>
        <div className='d-flex justify-content-around'>
          <CardHoverEffect>
            <img onClick={() => play("scissors")} className='card-style img-flued shadow' src='/img/scissors.png ' alt='card-img'/>
          </CardHoverEffect>
          <CardHoverEffect>
            <img onClick={() => play("rock")} className='card-style img-flued shadow' src='/img/rock.png'alt='card-img' />
          </CardHoverEffect>
          <CardHoverEffect>
            <img onClick={() => play("paper")} className='card-style img-flued shadow' src='/img/paper.png' alt='card-img'/>
          </CardHoverEffect>
          {/* <button className='button-style' onClick={() => play("rock")}>
            <img lassName='card-style img-flued shadow' src='/img/rock.png' />
          </button>
          <button className='button-style' onClick={() => play("paper")}>
            <img lassName='card-style img-flued' src='/img/paper.png' />
          </button> */}
        </div>
        <div className='main'>연속 10회 승리시 이스터에그 오픈</div>
      </Container>
    </div>
  );
}

export default App;

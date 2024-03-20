
import { useSpring, animated } from '@react-spring/web';
import '../component/box.css'

const Box = (props) => {
    const { transform, opacity } = useSpring({
        transform: `perspective(600px) rotateY(${props.flipped ? 180 : 0}deg)`,
        opacity: props.flipped ? 1 : 0,
        config: { mass: 5, tension: 500, friction: 80 },
    })


    let result;
    if (props.result === "비김") {
        result = "tie"
    } else if(props.result === "승리"){
        result = "win"
        // result = props.result === "승리" ? "win" : "fail"
    } else if(props.result === "패배"){
        result = "fail"
    } else{
        result = ""
    }

    return (

        <div>
            <div className={`box ${result ? result : ""} rounded`}>
                <h1>{props.title}</h1>
                <div className='flip'>
                    <animated.div className='flipCard' style={{transform,opacity:opacity.to(value => 1-value)}}>
                        <img src='/img/question.png'alt='box-img' />
                    </animated.div>
                    <animated.div className='flipCard' style={{ transform }}>
                        {props.item? <img src={props.item?.img} alt='box-img' />:""}
                    </animated.div>
                </div>
                <h2>{props.result}</h2>
            </div>
        </div>
    )
}

export default Box
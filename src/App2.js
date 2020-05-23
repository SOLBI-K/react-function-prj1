import React,{useState, useEffect} from "react";
import axios from 'axios';

/*
  1) 변수설정 (매개변수는 props)
  const [변수명, 메소드]= useState("[]") ("[]") ("0")
  메소드 = setter
  [music, setMusic]

  2) 저장해두고 didmount시에 한번 실행?ㅁ?ㅁ?ㅁ?ㅁ?
  useEffect(()=>{
    처리 => 데이터 읽기 axios, fetch...
  },[]);

  3) 한번만 함수 호출하고 이후 기억한 값으로 계속 재사용 => 메모리누수방지 / ex 계산기????
  useMemo
  react.memo

  4) 자동호출? 데이터변경이 없을 시에는 동일한 것 호출. 속도빠름
  useCallback
  
  5) 전역변수
  useContext
*/
/*
*   class App extends Component
*   {
*     constructor() {
        this.state={
            music:[]        ==> const [music, setMusic] = useState([]);
        }

      componentDidMount() {
        this.setState({movie:result.data});
      }     ==> useEffect(()=>{
                   처리 => 데이터 읽기 axios, fetch...
                  },[]);

      render() {
        return ()
      }
*   }
* */
function App2() {
    // var 은 전역, let 은 지역
    const [music, setMusic] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/music.json")
            .then((res)=>{   // res에 데이터 불러옴
                setMusic(res.data);
                console.log(res.data);
            })
    }, []);
    // 시작하자마자 한번만 읽음 : didMount 에만 함수를 적용하고 싶다면 함수의 2번째 인자로 [] deps 를 줘야함.
    // 내용 갱신 : deps 안씀.
    //console.log(music)
    const html=music.map((m)=>
        <tr>
            <td>{m.rank}</td>
            <td>
                {
                    m.state === "상승" && <span style={{"color":"red"}}>▲{m.idcrement}</span>
                }
                {
                    m.state === "하강" && <span style={{"color":"blue"}}>▼{m.idcrement}</span>
                }
                {
                    m.state === "유지" && <span style={{"color":"black"}}>-</span>
                }
            </td>
            <td><img src={m.poster} width={"35"} height={"35"}/></td>
            <td>{m.title}</td>
            <td>{m.singer}</td>
        </tr>
    )
    return(
        <div className={"row"}>
            <H/>
            <H2/>
            <H3/>
            <div style={{"height":"30px"}}></div>
            <table className={"table"}>
                <tr>
                    <td>
                        <input type={"text"} className={"input-sm"} size={"25"}/>
                    </td>
                </tr>
            </table>
            <table className={"table"}>
                <thead>
                    <tr className={"success"}>
                        <th>순위</th>
                        <th>등폭</th>
                        <th></th>
                        <th>노래명</th>
                        <th>가수명</th>
                    </tr>
                </thead>
                <tbody>
                {html}
                </tbody>
            </table>
        </div>
    )
}

// function  세가지 방법
//1) const H=()=>{}
// 화면새로고침 시 뿐만아니라 이벤트 발생 시에도 rendom이 적용될 것임. 이를 방지하기 위해 useMemo로 바꿔보자.
const H=()=>{
    const color=["red","orange","pink","yellow","blue"];
    const no=parseInt(Math.random()*5); //random : 0.0~0.99 => parseInt 0~4
    return (
        <h1 className={"text-center"} style={{"color":color[no]}}>Music Top50</h1>
    )
}
//2) function H2() {}
function H2() {
    return (
        <h1 className={"text-center"}>Music Top50</h1>
    )
}
//3) const H3=function () {}
const H3=function () {
    return (
        <h1 className={"text-center"}>Music Top50</h1>
    )
}

export default App2;
import { useState } from "react";

export default function index() {
  const [values, setValues] = React.useState({
    nbNumber: null,
    min: null,
    max: null,
    number: null,
    isWip: false,
    isWating: false,
    isStart: false,
    viewAnswer: false
  });
  const [intervalId, setIntervalId] = useState(null);
  const [history, setHistory] = useState([]);
  const handleChange = (e) => {
    setValues({
      ...values, [e.target.name]: e.target.value
    });
  }

  function between(n) {
    return Math.floor(Math.random() * (9 * Math.pow(10, n - 1))) + Math.pow(10, n - 1);
  }

  const rederer = () => {
    return (
      <div>
        {values.isStart ? (<p style={{ fontSize: 100 }}>ça va commencer...</p>) : null}
        {values.isWating ? (<p style={{ fontSize: 100 }}>Ecrivez votre réponse...</p>) : (<p style={{ fontSize: 200 }}>{values.number}</p>)}
      </div>
    )
  }

  function generator() {
    const currNumber = between(values.nbNumber);
    history.push(currNumber)
    setHistory(history)
    setValues({
      ...values, isWip: true,
      number: currNumber,
      isWating: false,
      isStart: false
    })
    setTimeout(() => {
      setValues({ ...values, isWating: true, isWip: true })
    }, 500)
  }
  const randomer = () => {
    setValues({ ...values, isStart: true })
    const ids = setInterval(generator, 5000);
    setIntervalId(ids)
  }

  return (
    <div style={{
      display: 'flex',
      width: 'auto', height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      flexDirection: 'column'
    }}
    >
      {console.log("oui c'est moi ", history)}
      <div>
        <label>
          <p style={{fontSize: 25}} >Nombre minimum de chiffre</p>
          <input
            type="number"
            name="nbNumber"
            onChange={e => handleChange(e)}
            style={{fontSize: 25}}
          />
        </label>
        <input type="submit" value="commencer" style={{fontSize: 25}} onClick={() => {
          randomer()
        }} />
         <input type="submit" value={values.viewAnswer ? "cacher les resultats": "Voir le resultats"} onClick={() => setValues({...values, viewAnswer: !values.viewAnswer})} style={{fontSize: 25}}/>
        {values.isWip ? (<button onClick={() => {
          setValues({
            ...values, isWip: false, isWating: false
          })
          clearInterval(intervalId)
        }}>STOP</button>) : null}
      </div>

      <div>
        {rederer()}
      </div>
      {values.viewAnswer ? (<ul>
        {history.map((tab, i) => {
          return (
            <li style={{fontSize: 70}}>
              {tab}
            </li>
          )
        })}
      </ul>) : null}
    </div>
  )
}
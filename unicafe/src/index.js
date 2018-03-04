import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import counterReducer from './reducer';
const store = createStore(counterReducer)


class App extends React.Component {
  render = () => {
    return (
      <div>
        <br />
        <em>anna palautetta</em>
        <br />
        <br />
        <div>
          <Button muuta='hyva' arvo={'Hyvä'} />
          <Button muuta='neutraali' arvo={'Neutraali'} />
          <Button muuta='huono' arvo={'Huono'} />
        </div>
        <br />
        <em>statistiikka</em>
        <br />
        <br />
        <div>
          <Statistics hyva={store.getState().hyva} neutraali={store.getState().neutraali}
            huono={store.getState().huono} positiivisia={store.getState().positiivisia} />
        </div>
      </div>
    )
  }
}

const Button = (props) => {
  return (
    <div>
      <button onClick={e => store.dispatch({ type: props.muuta })}>{props.arvo}</button>
    </div>
  )
}

const Statistics = (props) => {
  if (props.hyva !== 0 || store.getState().neutraali !== 0 || store.getState().huono !== 0) {
    return (
      <div>
        <table>
          <tbody>
            <Statistic teksti={'Hyvä'} arvo={props.hyva} />
            <Statistic teksti={'Neutraali'} arvo={props.neutraali} />
            <Statistic teksti={'Huono'} arvo={props.huono} />
            <Statistic teksti={'Positiivisia'} arvo={props.positiivisia + '%'} />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <p>ei yhtään palautetta annettu</p>
    </div>
  )

}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.teksti}</td><td>{props.arvo}</td>
    </tr>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)
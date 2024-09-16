import './styles/globals.css'
import App from './App'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import {MoralisProvider} from 'react-moralis'

//mainnet

// export const APP_ID = 'QwDYSf7XUP335icQytEJElxHRMp9PpsBH3uny6et';
// export const SERVER_URL = 'https://yik9vr1ibepc.grandmoralis.com:2053/server';

export const APP_ID = '001';
export const SERVER_URL = 'https://parse-backup2-surya.herokuapp.com/server';



const Application = () => {
    const isServerInfo = APP_ID && SERVER_URL ? true : false;
    if(isServerInfo)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
          <App />
      </MoralisProvider>
    );
};


ReactDOM.render(
        <Application />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

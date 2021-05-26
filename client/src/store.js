import { createStore } from 'redux';
import reducer from './reducer'

const store = createStore(reducer, { showRegister: false });

export default store;
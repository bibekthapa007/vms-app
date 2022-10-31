import { combineReducers } from 'redux';
import auth from '../features/auth/AuthSlice';
import vaccine from '../features/vaccine/VaccineSlice';

const reducers = combineReducers({
  auth,
  vaccine,
});

export default reducers;

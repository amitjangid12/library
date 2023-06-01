import { put, takeEvery } from 'redux-saga/effects';
import { DELETE_DATA, FETCH_DATA, FETCH_DATA_REQUEST, POST_DATA, UPDATE_DATA } from './constant';

function* getProduct() {

  let data = yield fetch('http://localhost:4401/posts');
  data = yield data.json();
  console.log("api call", data);
  yield put({ type: FETCH_DATA_REQUEST, data })
}

function* addRequest(data) {

  yield fetch(`http://localhost:4401/posts`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.data)
  })
    .then(r => r.json())
    .then(d => console.log(d))
    .catch(e => console.log(e))
}

function* updateRequest(data) {

  yield fetch(`http://localhost:4401/posts/${data.data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.data)
  })
    .then(r => r.json())
    .then(d => console.log(d))
    .catch(e => console.log(e))
}

function* deleteRequest(data) {
  console.log(data.data);
  yield fetch(`http://localhost:4401/posts/${data.data}`, { method: 'delete' })
  window.location.reload()
}

function* saga() {

  yield takeEvery(FETCH_DATA, getProduct)
  yield takeEvery(POST_DATA, addRequest)
  yield takeEvery(UPDATE_DATA, updateRequest)
  yield takeEvery(DELETE_DATA, deleteRequest)

}

export default saga;
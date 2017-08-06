import { call, put, race, take } from 'redux-saga/effects'
import GamesparksActions, { onAuthResponse } from '../Redux/GamesparksRedux.js'
import { hasGamesparksConnection } from '../Sagas/GamesparksSagas.js'
import { LoginTypes } from '../Redux/LoginRedux.js'

export function * loginSaga () {
  while (true) {
    const { username, password } = yield take(LoginTypes.LOGIN_REQUEST)
    // @todo bounce attempts until timeout
    const connected = yield hasGamesparksConnection()
    if (!connected) continue
    yield race({
      auth: call(login, username, password),
      logout: take(LoginTypes.LOGOUT)
    })
  }
}

// attempts to login
export function * login (username, password) {
  const data = {
    '@class': '.AuthenticationRequest',
    password: password,
    userName: username
  }
  yield put(GamesparksActions.websocketSend(data, onAuthResponse))
  return true
}

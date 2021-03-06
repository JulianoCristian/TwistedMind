import { fork, takeLatest } from 'redux-saga/effects'
import API from '../Services/Api'
import DebugConfig from '../Config/DebugConfig'
import FixtureAPI from '../Services/FixtureApi'

/* ------------- Types ------------- */

import { GithubTypes } from '../Redux/GithubRedux.js'
import { StartupTypes } from '../Redux/StartupRedux.js'

/* ------------- Sagas ------------- */

import { connectSaga } from '../Sagas/GamesparksSagas.js'
import { getUserAvatar } from '../Sagas/GithubSagas.js'
import { loginSaga } from '../Sagas/LoginSagas.js'
import { startup } from '../Sagas/StartupSagas.js'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield fork(connectSaga)
  yield fork(loginSaga)
  yield [
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api)
  ]
}

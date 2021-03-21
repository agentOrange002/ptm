import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
import storage from 'redux-persist/lib/storage';
//import storage from 'redux-persist/lib/storage/session'; change to localstorage and doesnt work on other tabs

//import createEncryptor from "redux-persist-transform-encrypt"; doesnt work anymore
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';

import { loadingBarReducer } from 'react-redux-loading-bar';

import { LOGIN_AUTHENTICATION, LOGIN_PROFILE } from './LoginReducer';
import { USERS } from './UsersReducer';
import { DASHBOARD } from './DashboardReducer';
import { USERIMAGE } from './UserImageReducer';
import { AUTHORITIES } from './AuthorityReducer';
import { ADDRESSES } from './AddressReducer';
import { MEMBERS } from './MemberReducer';
import { BOARDS } from './BoardReducer';
import { BOARDMEMBERS } from './BoardMemberReducer';
import { CATEGORIES } from './CategoryReducer';
import { MEMBERADDRESSES } from './MemberAddressReducer';
import { MEMBERCONTACTS } from './MemberContactReducer';
import { ROLES } from './RoleReducer'; 

  const encryptor = encryptTransform({
    secretKey: 'mydirtylittlesecret',
    onError: function (error) {
      // Handle the error.
    },
  });

const cookieAuthPersistConfig = {
  key: "root-auth",
  storage: new CookieStorage(Cookies, {
    expiration: {
      'default': 86400000 //expires cookies 1 day      
    }
  }),
  whitelist: ['LOGIN_AUTHENTICATION'],
  transforms: [encryptor],
}

const cookieLPPersistConfig = {
  key: "login-profile",
  storage: storage,
  blacklist: ['LOGIN_PROFILE'],
  transforms: [encryptor],
}

const cookieUsersAuthPersistConfig = {
  key: "users",
  storage: storage,
  blacklist: ['USERS'],
  transforms: [encryptor],
}

const dashboardPC = {
  key: 'dashboard',
  storage: storage,
  blacklist: ['DASHBOARD'],
  transforms: [encryptor],
}

const userimagePC = {
  key: 'userimage',
  storage: storage,
  blacklist: ['USERIMAGE'],
  transforms: [encryptor],
}

const authorityPC = {
  key: 'authority',
  storage: storage,
  blacklist: ['AUTHORITIES'],
  transforms: [encryptor],
}

const addressPC = {
  key: 'addresses',
  storage: storage,
  blacklist: ['ADDRESSES'],
  transforms: [encryptor],
}

const memberPC = {
  key: 'members',
  storage: storage,
  blacklist: ['MEMBERS'],
  transforms: [encryptor],
}

const boardPC = {
  key: 'boards',
  storage: storage,
  blacklist: ['BOARDS'],
  transforms: [encryptor],
}

const boardMemberPC = {
  key: 'boardmembers',
  storage: storage,
  blacklist: ['BOARDMEMBERS'],
  transforms: [encryptor],
}

const categoryPC = {
  key: 'categories',
  storage: storage,
  blacklist: ['CATEGORIES'],
  transforms: [encryptor],
}

const memberAddressPC = {
  key: 'memberaddress',
  storage: storage,
  blacklist: ['MEMBERADDRESSES'],
  transforms: [encryptor],
}

const memberContactPC = {
  key: 'membercontact',
  storage: storage,
  blacklist: ['MEMBERCONTACTS'],
  transforms: [encryptor],
}

const rolePC = {
  key: 'role',
  storage: storage,
  blacklist: ['ROLES'],
  transforms: [encryptor],
}

const rootReducer = combineReducers({
  form: formReducer,
  loadingBar: loadingBarReducer,
  LOGIN_AUTHENTICATION: LOGIN_AUTHENTICATION,
  LOGIN_PROFILE: persistReducer(cookieLPPersistConfig, LOGIN_PROFILE),
  USERS: persistReducer(cookieUsersAuthPersistConfig, USERS),  
  USERIMAGE: persistReducer(userimagePC, USERIMAGE),
  AUTHORITIES: persistReducer(authorityPC, AUTHORITIES),
  ADDRESSES: persistReducer(addressPC, ADDRESSES), 
  MEMBERS: persistReducer(memberPC, MEMBERS), 
  BOARDS: persistReducer(boardPC, BOARDS),
  BOARDMEMBERS: persistReducer(boardMemberPC, BOARDMEMBERS),
  CATEGORIES:  persistReducer(categoryPC, CATEGORIES),
  MEMBERADDRESSES: persistReducer(memberAddressPC, MEMBERADDRESSES),
  MEMBERCONTACTS: persistReducer(memberContactPC, MEMBERCONTACTS),
  ROLES:  persistReducer(rolePC, ROLES),
  DASHBOARD: persistReducer(dashboardPC, DASHBOARD)
});

export default persistReducer(cookieAuthPersistConfig,rootReducer);

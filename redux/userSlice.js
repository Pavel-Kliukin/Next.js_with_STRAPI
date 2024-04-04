import { createSlice } from "@reduxjs/toolkit"
import { getUserFromLocalCookie } from "@/lib/auth"
import { getUserIdFromLocalCookie } from "@/lib/auth"
import { getJwtFromLocalCookie } from "@/lib/auth"

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isUser: false,
    userName: undefined,
    id: undefined,
    jwt: undefined,
  },

  reducers: {
    isUser(state, action) {
      state.isUser = action.payload
    },
    getUserName(state, action) {
      state.userName = action.payload
    },
    getId(state, action) {
      state.id = action.payload
    },
    getJwt(state, action) {
      state.jwt = action.payload
    }
  },

})

export const checkUser = () => {
  return async (dispatch) => {

    const userName = getUserFromLocalCookie()
    dispatch(getUserName(userName))

    const id = getUserIdFromLocalCookie()
    if (id) {
      dispatch(getId(id))
    }

    const jwt = getJwtFromLocalCookie()
    dispatch(getJwt(jwt))
    if (jwt) {
    }

    if (userName) {
      dispatch(isUser(true))
    } else {
      dispatch(isUser(false))
    }

  }
}

export const {isUser, getUserName, getId, getJwt} = userSlice.actions // this line is connecting the reducer actions to the store

export default userSlice.reducer
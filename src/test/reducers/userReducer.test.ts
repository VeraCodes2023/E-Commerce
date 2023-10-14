import { fetchUsersAsync, registerUser,loginUserAsync  } from "../../redux/asyncThunk/userAsync"
import  store from "../public/store"
import {usersData} from "../data/usersData"
import usersServer from "../public/userServer";
import UserListProps from "../../types/UserList"


beforeAll(() => usersServer.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => usersServer.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => usersServer.close())

describe("Test async thunk actions in usersReducer", () => {
  test("Should fetch all users", async () => {
    await store.dispatch(fetchUsersAsync())
    const usersAmount = store.getState().usersReducer.users.length;
    expect(usersAmount).toBe(3);
  })

  test("Should login user with right credentials", async () => {
    await store.dispatch(loginUserAsync({email: usersData[0].email, password: usersData[0].password }));
    const response = store.getState().usersReducer.loginUser;
    expect(response).toMatchObject(usersData[0]);
  })

  test("Should not login user with wrong credentials", async () => {
    await store.dispatch(loginUserAsync({email: usersData[0].email, password: 'wrongPassword' }));
    const response = store.getState().usersReducer.error;
    expect(response).toBe('Cannot authenticate user');
  })

  test("Should register user", async () => {
    const newUser: UserListProps= {
      id:4,
      email: "newUserEmail@mail.com",
      password: "password",
      role:"customer",
      name: "Name",
      avatar: "https://picsum.photos/640/640?r=5207",
    }
    const action= await store.dispatch(registerUser(newUser));
    expect(action.meta.requestStatus).toBe("fulfilled")
  })


})
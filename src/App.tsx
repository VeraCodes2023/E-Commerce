import { BrowserRouter,Routes,Route,Navigate  } from 'react-router-dom';
import {useAppSelector} from './components/redux/hooks/useAppSelector';
import HeaderLogIn from './components/pages/HeaderLogin';
import Footer from './components/pages/Footer';
import publicRoutes from './components/routes/publicRoutes';
import privateRoutes from './components/routes/privateRoutes';
import adminRoutes from './components/routes/adminRoutes';
import {nanoid} from 'nanoid';
import HeaderLogOut from './components/pages/HeaderLogout';
import {useTheme} from './components/shared/ThemeContext';

const App = () => {

  const { theme, toggleTheme } = useTheme(); 
  const {loginUser} = useAppSelector(state=>state.usersReducer)
  
  return (
    <div className={`${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
        <BrowserRouter>
          <button onClick={toggleTheme} className='theme-btn'>Change Theme</button>
            {
              loginUser !==null ? 
              <HeaderLogOut/>:<HeaderLogIn/>
            }

          <Routes>
            {
              publicRoutes.map( ({path, component: Component})=><Route 
              key={`privateRoute-${nanoid()}`}
              path={path}
              element={<Component/>}
              ></Route>)
            }
            
            {
              privateRoutes.map( ({path, component: Component})=>{
                if( (loginUser !==null && loginUser !==undefined)  && (loginUser.role ==="customer"||loginUser.role ==="admin")) {
                    return (<Route
                        key={`privateRoute-${nanoid()}`}
                        path={path}
                        element={<Component/>}
                      >
                    </Route>)
                }else{
                    return  (<Route key={`Navigate-${nanoid()}`}  
                    path={path} 
                    element={<Navigate to="/login" />}
                  >
                  </Route>)
                }
              })
             
            }

            {
              adminRoutes.map(({path,component:Component})=>
                ((loginUser !==null && loginUser !==undefined)  && loginUser.role ==="admin")?
                (<Route 
                key={`adminRoute-${nanoid()}`}
                path={path}
                element={<Component/>}
              >
              </Route>)
              :(
                <Route key={`Navigate-${nanoid()}`}
                path={path} 
                element={<Navigate to="/login"/>}
                >
                </Route>
              )
              )
            }
            </Routes>
            <Footer/>
        </BrowserRouter>
    </div>
  )
}

export default App
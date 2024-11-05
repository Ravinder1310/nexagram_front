import { useEffect } from 'react'
import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'
import ProtectedRoutes from './components/ProtectedRoutes'
import MlmDetails from './components/mlmDetails'
import Incomes from './components/incomes'
import InfluencerPackages from './components/InfluencerPackages'
import BenefitsPackage from './components/benifitsPackage'
import InvesterSignup from './components/InvesterSignup/InvesterSignup'
import InvesterLogin from './components/InvesterLogin/InvesterLogin'
import InvesterRecharge from './components/InvesterRecharge/InvesterRecharge'
import MobileRecharge from './components/mobileRecharge'
import GenerationIncomes from './components/generationInome'
import DailyIncomes from './components/dailyIncome'
import DirectReferralIncomes from './components/directReferralIncome'
import MyTeam from './components/MyTeam/MyTeam'


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      },
      {
        path: '/plans/',
        element: <ProtectedRoutes> <MlmDetails /></ProtectedRoutes>
      },
      {
        path: '/incomes/',
        element: <ProtectedRoutes> <Incomes /></ProtectedRoutes>
      },
      {
        path: '/chat',
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
      },
      {
        path: '/benifits-package',
        element: <ProtectedRoutes><BenefitsPackage /></ProtectedRoutes>
      },
      {
        path: '/influencer-packages',
        element: <ProtectedRoutes><InfluencerPackages /></ProtectedRoutes>
      },

      {

        path: '/mobile-recharge',
        element: <ProtectedRoutes><MobileRecharge /></ProtectedRoutes>
      },
      {
        path: '/invester-recharge',
        element: <ProtectedRoutes><InvesterRecharge /></ProtectedRoutes>
      },
      {
        path: '/generation-income',
        element: <ProtectedRoutes><GenerationIncomes /></ProtectedRoutes>

      },
      {
        path: '/referral-income',
        element: <DirectReferralIncomes />
      },
      {
        path: '/revenue-income',
        element: <ProtectedRoutes> <DailyIncomes /></ProtectedRoutes>

      },
      {
        path: '/my-team',
        element: <ProtectedRoutes> <MyTeam /></ProtectedRoutes>

      },
    ]
  },

 
  {
    path: '/invester-registration',
    element: <InvesterSignup />
  },
  {
    path: '/invester-login',
    element: <InvesterLogin />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },

])

function App() {
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io(`${import.meta.env.VITE_API_URL}`, {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <div className=''>
      <RouterProvider router={browserRouter} />
    </div>
  )
}

export default App

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
import GenerationIncomes from './components/investerIncome/generationInome'
import DailyIncomes from './components/investerIncome/dailyIncome'
import DirectReferralIncomes from './components/investerIncome/directReferralIncome'
import MyTeam from './components/MyTeam/MyTeam'
import RankIncomes from './components/investerIncome/rankIncome'
import RewardIncomes from './components/investerIncome/rewardsIncome'
import AdminLogin from './components/Admin/AdminLogin/AdminLogin'
import AdminDashbord from './components/Admin/AdminDashbord/AdminDashbord'
import AllUsers from './components/Admin/AllUsers/AllUsers'
import PaidUsers from './components/Admin/PaidUsers/PaidUsers'
import UnpaidUsersList from './components/Admin/UnpaidUserslist/UnpaidUserslist'
import BlockedUsers from './components/Admin/BlockedUsers/BlockedUsers'
import ActivateUserForm from './components/Admin/ActivateUserForm/ActivateUserForm'
import DownlineUsers from './components/Admin/DownlineUsers/DownlineUsers'
import AllRecharges from './components/allRecharges'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import Setting from './components/setting'
import UploadGallery from './components/allGallery'
import TeamDetails from './teamDetails/teamDetails'
import LikeIncome from './components/influencersIncome/LikeIncome'
import InvesterWithdrawlHistory from './components/investerWithdrawl'
import AllCryptoTransaction from './components/Admin/cryptoTransaction/cryptoTransaction'
import FireworksEffect from './components/fireWork'
import UsdtTest from './components/Usdttest/UsdtTest'

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
        path: '/plans',
        element: <ProtectedRoutes> <MlmDetails /></ProtectedRoutes>
      },
      {
        path: '/incomes',
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
        element: <ProtectedRoutes><UsdtTest /></ProtectedRoutes>
        //coin payment gateway for recharge ====> element: <ProtectedRoutes><InvesterRecharge /></ProtectedRoutes>
        
      },
      {
        path: '/generation-income',
        element: <ProtectedRoutes><GenerationIncomes /></ProtectedRoutes>

      },
      {
        path: '/referral-income',
        element: <ProtectedRoutes><DirectReferralIncomes /></ProtectedRoutes>
      },
      {
        path: '/revenue-income',
        element: <ProtectedRoutes> <DailyIncomes /></ProtectedRoutes>

      },
      {
        path: '/my-team',
        element: <ProtectedRoutes> <MyTeam /></ProtectedRoutes>
      },
      {
        path: '/royality-income',
        element: <ProtectedRoutes> <RankIncomes /></ProtectedRoutes>

      },
      {
        path: '/rewards-income',
        element: <ProtectedRoutes> <RewardIncomes /></ProtectedRoutes>

      },
      {
        path: '/all-recharge',
        element: <ProtectedRoutes> <AllRecharges /></ProtectedRoutes>

      },
      {
        path: '/settings',
        element: <ProtectedRoutes> <Setting /></ProtectedRoutes>

      },
      {
        path: '/gallery',
        element: <ProtectedRoutes> <UploadGallery /></ProtectedRoutes>
      },
      {
        path: '/team-details',
        element: <ProtectedRoutes> <TeamDetails /></ProtectedRoutes>
      },
      {
        path: '/like-income',
        element: <ProtectedRoutes> <LikeIncome /></ProtectedRoutes>
      },
      {
        path: '/invester-withdrawl',
        element: <ProtectedRoutes> <InvesterWithdrawlHistory /></ProtectedRoutes>
      },
      {
        path: '/firework',
        element: <ProtectedRoutes> <FireworksEffect /></ProtectedRoutes>
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
    path: '/usdt-recharge',
    element: <UsdtTest />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/admin/dashbord',
    element:<AdminProtectedRoute> <AdminDashbord /> </AdminProtectedRoute>
  },
  {
    path: '/admin/all-users',
    element:<AdminProtectedRoute> <AllUsers /> </AdminProtectedRoute>
  },
  {
    path: '/admin/all-paid-users',
    element:<AdminProtectedRoute> <PaidUsers /> </AdminProtectedRoute>
  },
  {
    path: '/admin/all-unpaid-users',
    element:<AdminProtectedRoute> <UnpaidUsersList/> </AdminProtectedRoute>
  },
  {
    path: '/admin/blocked-users',
    element:<AdminProtectedRoute> <BlockedUsers/> </AdminProtectedRoute>
  },
  {
    path: '/admin/activate-user',
    element:<AdminProtectedRoute> <ActivateUserForm/> </AdminProtectedRoute>
  },
  {
    path: '/admin/user-team',
    element:<AdminProtectedRoute> <DownlineUsers /> </AdminProtectedRoute>
  },
  {
    path: '/admin/all-withdrawl-requests',
    element:<AdminProtectedRoute> <AllCryptoTransaction /> </AdminProtectedRoute>
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

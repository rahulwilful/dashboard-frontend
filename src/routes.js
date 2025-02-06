import React from 'react'

const tempDashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const TableLimits = React.lazy(() => import('./views/limits/Tables/TableLimit'))
const EditTable = React.lazy(() => import('./views/limits/Tables/EditTable'))

const TableAnalysis = React.lazy(() => import('./views/TableAnalysis/TableAnalysis'))

const UpdateTableLimits = React.lazy(() => import('./views/settings/Configs/UpdateTableLimits'))
const Backgrounds = React.lazy(() => import('./views/settings/Configs/Backgrounds'))
const Themes = React.lazy(() => import('./views/settings/Configs/Themes'))
const Languages = React.lazy(() => import('./views/settings/Configs/Languages'))
const Currency = React.lazy(() => import('./views/settings/Configs/Currency'))
const ManageData = React.lazy(() => import('./views/settings/Configs/ManageData'))

const RouletteDashboard = React.lazy(() => import('./views/analysis/Roulette/RouletteDashboard'))
const BaccaratDashboard = React.lazy(() => import('./views/analysis/Baccarat/BaccaratDashboard.js'))
const AndarBaharDashboard = React.lazy(
  () => import('./views/analysis/AndarBahar/AndarBaharDashboard.js'),
)
const ThreeCardPokerDashboard = React.lazy(
  () => import('./views/analysis/3CardPoker/ThreeCardPokerDashboard.js'),
)

const Rough = React.lazy(() => import('./views/rough/Rough'))
const Rough2 = React.lazy(() => import('./views/rough/Rough2'))

const Config = React.lazy(() => import('./views/config/Config'))

const Login = React.lazy(() => import('./views/pages/login/Login'))

const MyAccount = React.lazy(() => import('./views/Account/MyAccount'))
const UpdateAccount = React.lazy(() => import('./views/Account/UpdateAccount'))

const AllUsers = React.lazy(() => import('./views/Users/AllUsers'))
const UpdateUser = React.lazy(() => import('./views/Users/UpdateUser'))
const User = React.lazy(() => import('./views/Users/User'))
const AddUser = React.lazy(() => import('./views/Users/AddUser'))

const routes = [
  { path: '/user/:id', name: 'user', element: User },
  { path: '/all/users', name: 'allusers', element: AllUsers },
  { path: '/update/user/:id', name: 'updateuser', element: UpdateUser },
  {
    path: '/my/account',
    name: 'myaccount',
    element: MyAccount,
  },
  {
    path: '/add/user',
    name: 'AddUser',
    element: AddUser,
  },
  {
    path: '/update/account',
    name: 'updateaccount',
    element: UpdateAccount,
  },

  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: tempDashboard },
  {
    path: '/dashboard/threecardpoker/:game/:table_limit_name/:game_type_id/:table_limit_id',
    name: 'Dashboard',
    element: ThreeCardPokerDashboard,
  },
  {
    path: '/dashboard/roulette/:game/:table_limit_name/:game_type_id/:table_limit_id',
    name: 'Dashboard',
    element: RouletteDashboard,
  },
  {
    path: '/dashboard/baccarat/:game/:table_limit_name/:game_type_id/:table_limit_id',
    name: 'Dashboard',
    element: BaccaratDashboard,
  },
  {
    path: '/dashboard/andarbahar/:game/:table_limit_name/:game_type_id/:table_limit_id',
    name: 'Dashboard',
    element: AndarBaharDashboard,
  },
  {
    path: '/dashboard/:game/:table_limit_name/:game_type_id/:table_limit_id',
    name: 'Dashboard',
    element: RouletteDashboard,
  },
  { path: '/temp/dashboard', name: 'tempDashboard', element: tempDashboard },
  { path: '/limits', name: 'Limits', element: TableLimits },

  { path: '/limits/roulette', name: 'Roulette', element: TableLimits },
  { path: '/limits/:game/:id', name: 'TableLimits', element: TableLimits },
  { path: '/limits/edit/:game/:id', name: 'EditTable', element: EditTable },

  { path: '/table/analysis/', name: 'Limits', element: TableLimits },

  { path: '/table/analysis/roulette', name: 'Dashboard', element: RouletteDashboard },
  { path: '/table/analysis/:game/:id', name: 'Dashboard', element: TableAnalysis },

  { path: '/settings/update/table/limit', name: 'UpdateTableLimits', element: UpdateTableLimits },
  { path: '/settings/update/background', name: 'Backgrounds', element: Backgrounds },
  { path: '/settings/update/themes', name: 'Themes', element: Themes },
  { path: '/settings/update/languages', name: 'Languages', element: Languages },
  { path: '/settings/update/currency', name: 'Currency', element: Currency },
  { path: '/settings/update/manage/data', name: 'deleteData', element: ManageData },

  { path: '/rough', name: 'Rough', element: Rough },
  { path: '/rough2', name: 'Rough2', element: Rough2 },

  { path: '/config', name: 'Config', element: Config },

  { path: '/login', name: 'Login', element: Login },

  ///////////////////////////////////////////////////////////////////////////
]

export default routes

import React from 'react'

const tempDashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

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

  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes

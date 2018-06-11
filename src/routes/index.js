import {
  MainView,
  HomePage,
  PullToRefresh,
  DemoPage,
} from '../views'
import {
  Pubg,
  Ori,
  ToTheMoon,
} from '../component'

// To see more options in https://github.com/theKashey/react-imported-component

export default [
  // {
  //   path: '/refresh',
  //   component: PullToRefresh,
  //   childRoutes: []
  // },
  {
    path: '/',
    component: DemoPage,
    childRoutes: [
      {
        path: '/tomoon',
        component: ToTheMoon
      },
      {
        path: '/ori',
        component: Ori
      },
      {
        path: '/pubg',
        component: Pubg
      },
      {
        path: '*',
        component: ToTheMoon
      },
    ]
  },
]

import MainView from '../views/MainView'
import HomePage from '../views/HomePage'
import Pubg from '../views/Pubg'
import Ori from '../views/Ori'
import ToTheMoon from '../views/ToTheMoon'

// To see more options in https://github.com/theKashey/react-imported-component

export default [
  {
    path: '/',
    component: MainView,
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
      }
    ]
  }
]

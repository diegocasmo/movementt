import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import WorkoutListScreen from '../features/workout-list/screens/WorkoutListScreen'

export default createAppContainer(
  createSwitchNavigator({
    WorkoutList: WorkoutListScreen,
  })
)

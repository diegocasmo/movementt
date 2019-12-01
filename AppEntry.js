import { registerRootComponent } from 'expo'
import { activateKeepAwake } from 'expo-keep-awake'

import Root from './src/Root'

if (__DEV__) {
  activateKeepAwake()
}

registerRootComponent(Root)

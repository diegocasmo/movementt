import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Footer, FooterTab, Button, Icon } from 'native-base'

const FooterTabs = ({ state, navigation }) => {
  const getIconName = ({ name }) => {
    switch (name) {
      case 'Settings':
        return 'md-settings'
      case 'ExerciseList':
        return 'md-fitness'
      default:
        return 'md-home'
    }
  }

  const renderButtons = () => {
    return state.routes.map((route, index) => {
      const isFocused = state.index === index
      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        })

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name)
        }
      }

      return (
        <Button vertical onPress={onPress} key={index}>
          <Icon
            active
            style={isFocused ? styles.activeIcon : {}}
            name={getIconName(route)}
          />
        </Button>
      )
    })
  }

  return (
    <Footer>
      <FooterTab>{renderButtons()}</FooterTab>
    </Footer>
  )
}

FooterTabs.propTypes = {
  state: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  activeIcon: {
    color: 'black',
  },
})

export default FooterTabs

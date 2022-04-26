import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Footer, FooterTab } from 'native-base'
import { Button, Icon } from '_components/ui'

const FooterTabs = ({ state, navigation }) => {
  const getIconName = ({ name }) => {
    switch (name) {
      case 'SettingsTab':
        return 'md-settings-sharp'
      case 'WorkoutListTab':
        return 'md-refresh'
      case 'ExerciseListTab':
        return 'md-barbell-outline'
      default:
        return 'md-home-outline'
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
        <Button
          colorScheme="transparent"
          onPress={onPress}
          key={index}
          icon={
            <Icon
              style={[styles.icon, isFocused ? styles.activeIcon : {}]}
              name={getIconName(route)}
            />
          }
        />
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
  icon: {
    opacity: 0.5,
  },
  activeIcon: {
    opacity: 1,
    color: 'black',
  },
})

export default FooterTabs

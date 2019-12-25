import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Footer, FooterTab, Button, Icon } from 'native-base'

const FooterTabs = ({ navigation }) => {
  const { index } = navigation.state
  return (
    <Footer>
      <FooterTab>
        <Button vertical onPress={() => navigation.navigate('WorkoutList')}>
          <Icon style={index === 0 ? styles.activeIcon : {}} name="md-home" />
        </Button>
        <Button vertical onPress={() => navigation.navigate('Settings')}>
          <Icon
            style={index === 1 ? styles.activeIcon : {}}
            name="md-settings"
          />
        </Button>
      </FooterTab>
    </Footer>
  )
}

FooterTabs.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  activeIcon: {
    color: 'black',
  },
})

export default FooterTabs

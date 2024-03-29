import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  play,
  stop,
  toggleSound,
  getCurrRound,
  getRoutine,
  hasSound,
} from '_state/reducers/session'
import { StyleSheet, Alert } from 'react-native'
import { View, Text } from 'native-base'
import { Button, Icon } from '_components/ui'

const TopControls = ({ onQuit }) => {
  const dispatch = useDispatch()
  const currRound = useSelector(getCurrRound)
  const routine = useSelector(getRoutine)
  const sound = useSelector(hasSound)

  const handleQuit = () => {
    dispatch(stop())

    Alert.alert(
      'Quit Routine',
      'Are you sure you want to quit the routine?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            dispatch(play())
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            onQuit()
          },
        },
      ],
      { cancelable: false }
    )
  }

  const handleToggleSound = () => {
    dispatch(toggleSound())
  }

  return (
    <View style={styles.container}>
      <Button
        colorScheme="transparent"
        style={styles.btnSound}
        onPress={handleToggleSound}
        icon={
          sound ? (
            <Icon style={styles.icon} name="md-volume-high" />
          ) : (
            <Icon style={styles.icon} name="md-volume-off" />
          )
        }
      />
      <Text style={styles.text}>
        Round: {currRound}/{routine.rounds}
      </Text>
      <Button
        colorScheme="transparent"
        style={styles.btnClose}
        onPress={handleQuit}
        icon={<Icon style={styles.icon} name="md-close" />}
      />
    </View>
  )
}

export default TopControls

TopControls.propTypes = {
  onQuit: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnSound: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  btnClose: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 38,
  },
  icon: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
  },
})

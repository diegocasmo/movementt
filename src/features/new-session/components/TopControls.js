import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  play,
  stop,
  toggleSound,
  getCurrRound,
  getWorkout,
  hasSound,
} from '../reducers/new-session'
import { StyleSheet, Alert } from 'react-native'
import { View, Button, Icon, Text } from 'native-base'

const TopControls = ({ onQuit }) => {
  const dispatch = useDispatch()
  const currRound = useSelector(getCurrRound)
  const workout = useSelector(getWorkout)
  const sound = useSelector(hasSound)

  const handleQuit = () => {
    dispatch(stop())

    Alert.alert(
      'Quit Workout',
      'Are you sure you want to quit the workout?',
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
      <Button style={styles.btnSound} transparent onPress={handleToggleSound}>
        {sound ? (
          <Icon style={styles.icon} active name="md-volume-high" />
        ) : (
          <Icon style={styles.icon} active name="md-volume-off" />
        )}
      </Button>
      <Text style={styles.text}>
        Round: {currRound}/{workout.rounds}
      </Text>
      <Button style={styles.btnClose} transparent onPress={handleQuit}>
        <Icon style={styles.icon} active name="md-close" />
      </Button>
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

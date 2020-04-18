import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { play, stop, getCurrRound, getWorkout } from '../reducers/new-session'
import { StyleSheet, Alert, Text } from 'react-native'
import { View, Button, Icon } from 'native-base'

const TopControls = ({ onQuit }) => {
  const dispatch = useDispatch()
  const currRound = useSelector(getCurrRound)
  const workout = useSelector(getWorkout)

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Round: {currRound}/{workout.rounds}
      </Text>
      <Button style={styles.button} transparent onPress={handleQuit}>
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
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 38,
  },
  button: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  icon: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
  },
})

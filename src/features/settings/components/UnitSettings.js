import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { StyleSheet } from 'react-native'
import {
  Body,
  Button,
  Left,
  ListItem,
  Right,
  Separator,
  Text,
  View,
} from 'native-base'
import { Icon } from '_components/Icon'
import { UnitTypeForm } from './UnitTypeForm'
import { showError } from '_utils/toast'
import { getUser, update } from '_state/reducers/auth'
import { User } from '_api'

export const UnitSettings = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)

  const [isWeightUnitVisible, setIsWeightUnitVisible] = useState(false)
  const [isDistanceUnitVisible, setIsDistanceUnitVisible] = useState(false)
  const [isUpdatingWeightUnit, setIsUpdatingWeightUnit] = useState(false)
  const [isUpdatingDistanceUnit, setIsUpdatingDistanceUnit] = useState(false)

  const handleSubmitWeightUnit = async (value) => {
    setIsUpdatingWeightUnit(true)

    try {
      const action = await dispatch(
        update({ ...user, weight_unit_type: value })
      )
      unwrapResult(action)
      setIsWeightUnitVisible(false)
    } catch (err) {
      showError(err.message)
    } finally {
      setIsUpdatingWeightUnit(false)
    }
  }

  const handleSubmitDistanceUnit = async (value) => {
    setIsUpdatingDistanceUnit(true)

    try {
      const action = await dispatch(
        update({ ...user, distance_unit_type: value })
      )
      unwrapResult(action)
      setIsDistanceUnitVisible(false)
    } catch (err) {
      showError(err.message)
    } finally {
      setIsUpdatingDistanceUnit(false)
    }
  }

  return (
    <View>
      <Separator bordered>
        <Text>Units</Text>
      </Separator>

      <ListItem
        icon
        onPress={() => {
          setIsWeightUnitVisible(true)
        }}
      >
        <Left>
          <Button>
            <Icon color="white" name="md-barbell-outline" />
          </Button>
        </Left>
        <Body>
          <Text>Weight unit</Text>
        </Body>
        <Right>
          <Text>
            <Text style={styles.capitalize}>{user.weight_unit_type}</Text> (
            {User.getWeightUnitTypeLabel(user)})
          </Text>
        </Right>
      </ListItem>

      <ListItem
        icon
        onPress={() => {
          setIsDistanceUnitVisible(true)
        }}
      >
        <Left>
          <Button>
            <Icon color="white" name="md-location" />
          </Button>
        </Left>
        <Body>
          <Text>Distance unit</Text>
        </Body>
        <Right>
          <Text>
            <Text style={styles.capitalize}>{user.distance_unit_type}</Text> (
            {User.getDistanceUnitTypeLabel(user)})
          </Text>
        </Right>
      </ListItem>

      <UnitTypeForm
        isSubmitting={isUpdatingWeightUnit}
        onCancel={() => {
          setIsWeightUnitVisible(false)
        }}
        onSubmit={handleSubmitWeightUnit}
        options={User.WEIGHT_UNIT_TYPE_OPTS}
        title="Update weight unit"
        value={user.weight_unit_type}
        visible={isWeightUnitVisible}
      />

      <UnitTypeForm
        isSubmitting={isUpdatingDistanceUnit}
        onCancel={() => {
          setIsDistanceUnitVisible(false)
        }}
        onSubmit={handleSubmitDistanceUnit}
        options={User.DISTANCE_UNIT_TYPE_OPTS}
        title="Update distance unit"
        value={user.distance_unit_type}
        visible={isDistanceUnitVisible}
      />
    </View>
  )
}

UnitSettings.propTypes = {}

const styles = StyleSheet.create({
  capitalize: {
    textTransform: 'capitalize',
  },
})

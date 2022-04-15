import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { StyleSheet } from 'react-native'
import { Body, Left, ListItem, Right, Separator, Text, View } from 'native-base'
import { Icon } from '_components/Icon'
import { Button } from '_components/ui/Button'
import { UnitTypeForm } from './UnitTypeForm'
import { showError } from '_utils/toast'
import { useGetRoutinesQuery } from '_state/services/routine'
import { getUser, update } from '_state/reducers/auth'
import {
  DISTANCE_UNIT_TYPE_OPTS,
  WEIGHT_UNIT_TYPE_OPTS,
  getDistanceUnitTypeLabel,
  getWeightUnitTypeLabel,
} from '_utils/units'

export const UnitSettings = () => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const { refetch: refetchRoutines } = useGetRoutinesQuery(
    'useGetRoutinesQuery'
  )

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
      refetchRoutines()
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
      refetchRoutines()
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
          <Button icon={<Icon color="white" name="md-barbell-outline" />} />
        </Left>
        <Body>
          <Text>Weight unit</Text>
        </Body>
        <Right>
          <Text>
            <Text style={styles.capitalize}>{user.weight_unit_type}</Text> (
            {getWeightUnitTypeLabel(user.weight_unit_type)})
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
          <Button icon={<Icon color="white" name="md-location" />} />
        </Left>
        <Body>
          <Text>Distance unit</Text>
        </Body>
        <Right>
          <Text>
            <Text style={styles.capitalize}>{user.distance_unit_type}</Text> (
            {getDistanceUnitTypeLabel(user.distance_unit_type)})
          </Text>
        </Right>
      </ListItem>

      <UnitTypeForm
        isSubmitting={isUpdatingWeightUnit}
        onCancel={() => {
          setIsWeightUnitVisible(false)
        }}
        onSubmit={handleSubmitWeightUnit}
        options={WEIGHT_UNIT_TYPE_OPTS}
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
        options={DISTANCE_UNIT_TYPE_OPTS}
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

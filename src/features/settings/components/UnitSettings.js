import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Body, Left, ListItem, Right, Separator, Text, View } from 'native-base'
import { Button, Icon } from '_components/ui'
import { UnitTypeForm } from './UnitTypeForm'
import { showError } from '_utils/toast'
import { useAuth } from '_context/AuthContext'
import {
  DISTANCE_UNIT_TYPE_OPTS,
  WEIGHT_UNIT_TYPE_OPTS,
  getDistanceUnitTypeLabel,
  getWeightUnitTypeLabel,
} from '_utils/units'

export const UnitSettings = () => {
  const { user, update } = useAuth()

  const [isWeightUnitVisible, setIsWeightUnitVisible] = useState(false)
  const [isDistanceUnitVisible, setIsDistanceUnitVisible] = useState(false)
  const [isUpdatingWeightUnit, setIsUpdatingWeightUnit] = useState(false)
  const [isUpdatingDistanceUnit, setIsUpdatingDistanceUnit] = useState(false)

  const handleSubmitWeightUnit = async (value) => {
    setIsUpdatingWeightUnit(true)

    try {
      await update.mutateAsync({
        pathParams: { id: user.id },
        bodyParams: { ...user, weight_unit_type: value },
      })
      setIsWeightUnitVisible(false)
    } catch (err) {
      showError(err)
    } finally {
      setIsUpdatingWeightUnit(false)
    }
  }

  const handleSubmitDistanceUnit = async (value) => {
    setIsUpdatingDistanceUnit(true)

    try {
      await update.mutateAsync({
        pathParams: { id: user.id },
        bodyParams: { ...user, distance_unit_type: value },
      })
      setIsDistanceUnitVisible(false)
    } catch (err) {
      showError(err)
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

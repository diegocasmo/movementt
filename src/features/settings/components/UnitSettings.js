import React, { useState } from 'react'
import { useSelector } from 'react-redux'
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
import { getUser } from '_state/reducers/auth'
import { User } from '_api'

export const UnitSettings = () => {
  const user = useSelector(getUser)
  const [isWeightUnitVisible, setIsWeightUnitVisible] = useState(false)
  const [isDistanceUnitVisible, setIsDistanceUnitVisible] = useState(false)

  const handleShowWeightUnit = () => {
    setIsWeightUnitVisible(true)
  }
  const handleHideWeightUnit = () => {
    setIsWeightUnitVisible(false)
  }
  const handleSubmitWeightUnit = async () => {}

  const handleShowDistanceUnit = () => {
    setIsDistanceUnitVisible(true)
  }
  const handleHideDistanceUnit = () => {
    setIsDistanceUnitVisible(false)
  }
  const handleSubmitDistanceUnit = async () => {}

  return (
    <View>
      <Separator bordered>
        <Text>Units</Text>
      </Separator>

      <ListItem icon onPress={handleShowWeightUnit}>
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

      <ListItem icon onPress={handleShowDistanceUnit}>
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
        isSubmitting={false}
        onCancel={handleHideWeightUnit}
        onSubmit={handleSubmitWeightUnit}
        options={User.WEIGHT_UNIT_TYPE_OPTS}
        title="Update weight unit"
        value={user.weight_unit_type}
        visible={isWeightUnitVisible}
      />

      <UnitTypeForm
        isSubmitting={false}
        onCancel={handleHideDistanceUnit}
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

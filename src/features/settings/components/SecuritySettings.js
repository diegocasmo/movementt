import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import {
  Body,
  Left,
  ListItem,
  Right,
  Separator,
  Spinner,
  Text,
  View,
} from 'native-base'
import { Button, Icon } from '_components/ui'
import { showError } from '_utils/toast'
import { signOut } from '_state/reducers/auth'

export const SecuritySettings = ({ navigation }) => {
  const dispatch = useDispatch()
  const [isSigningOut, setSigningOut] = useState(false)

  const handlePressOnSignOut = async () => {
    setSigningOut(true)
    try {
      const action = await dispatch(signOut())
      unwrapResult(action)
    } catch (err) {
      setSigningOut(false)
      showError(err.message)
    }
  }

  const handlePressOnUpdatePassword = () => {
    navigation.navigate('Reauthenticate')
  }

  return (
    <View>
      <Separator bordered>
        <Text>Security</Text>
      </Separator>
      <ListItem icon onPress={handlePressOnUpdatePassword}>
        <Left>
          <Button
            colorScheme="primary"
            icon={<Icon color="white" name="md-lock-closed-outline" />}
          />
        </Left>
        <Body>
          <Text>Update password</Text>
        </Body>
      </ListItem>
      <ListItem icon disabled={isSigningOut} onPress={handlePressOnSignOut}>
        <Left>
          <Button
            colorScheme="danger"
            icon={<Icon color="white" name="md-log-out-outline" />}
          />
        </Left>
        <Body>
          <Text>Sign out</Text>
        </Body>
        {isSigningOut && (
          <Right>
            <Spinner color="black" size="small" />
          </Right>
        )}
      </ListItem>
    </View>
  )
}

SecuritySettings.propTypes = {
  navigation: PropTypes.object.isRequired,
}

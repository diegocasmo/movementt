import React from 'react'
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
import { useAuth } from '_context/AuthContext'

export const SecuritySettings = ({ navigation }) => {
  const { signOut } = useAuth()

  const handlePressOnSignOut = async () => {
    try {
      await signOut.mutateAsync()
    } catch (err) {
      showError(err)
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
      <ListItem
        icon
        disabled={signOut.isLoading}
        onPress={handlePressOnSignOut}
      >
        <Left>
          <Button
            colorScheme="danger"
            icon={<Icon color="white" name="md-log-out-outline" />}
          />
        </Left>
        <Body>
          <Text>Sign out</Text>
        </Body>
        {signOut.isLoading && (
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

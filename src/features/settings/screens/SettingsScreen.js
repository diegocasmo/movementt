import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import PropTypes from 'prop-types'
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Button,
  ListItem,
  Text,
  Left,
  Right,
  Spinner,
} from 'native-base'
import { Icon } from '_components/Icon'
import { showError } from '_utils/toast'
import { signOut } from '_state/reducers/auth'

const SettingsScreen = ({ navigation }) => {
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
    <Container>
      <Header>
        <Body>
          <Title>Settings</Title>
        </Body>
      </Header>
      <Content>
        <ListItem icon onPress={handlePressOnUpdatePassword}>
          <Left>
            <Button>
              <Icon color="white" name="md-lock-closed-outline" />
            </Button>
          </Left>
          <Body>
            <Text>Update password</Text>
          </Body>
        </ListItem>
        <ListItem icon disabled={isSigningOut} onPress={handlePressOnSignOut}>
          <Left>
            <Button>
              <Icon color="white" name="md-log-out-outline" />
            </Button>
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
      </Content>
    </Container>
  )
}

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default SettingsScreen

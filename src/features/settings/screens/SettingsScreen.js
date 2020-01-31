import React, { useState } from 'react'
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Right,
  Spinner,
} from 'native-base'
import { signOut } from '../../../api/auth/sign-out'
import { showSuccess, showError } from '../../../utils/toast'

const SettingsScreen = () => {
  const [isSigningOut, setSigningOut] = useState(false)

  const handlePressOnSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
      showSuccess('You have been successfully signed out')
    } catch (err) {
      setSigningOut(false)
      showError(err.message)
    }
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>Settings</Title>
        </Body>
      </Header>
      <Content>
        <ListItem icon onPress={handlePressOnSignOut}>
          <Left>
            <Button>
              <Icon name="md-log-out" />
            </Button>
          </Left>
          <Body>
            <Text>Sign out </Text>
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

export default SettingsScreen

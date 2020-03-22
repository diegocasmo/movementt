import React, { useState } from 'react'
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
  Icon,
  Left,
  Right,
  Spinner,
} from 'native-base'
import { signOut } from '../../../api/sign-out'
import { showError } from '../../../utils/toast'

const SettingsScreen = ({ navigation }) => {
  const [isSigningOut, setSigningOut] = useState(false)

  const handlePressOnSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut()
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
              <Icon name="md-lock" />
            </Button>
          </Left>
          <Body>
            <Text>Update password</Text>
          </Body>
        </ListItem>
        <ListItem icon disabled={isSigningOut} onPress={handlePressOnSignOut}>
          <Left>
            <Button>
              <Icon name="md-log-out" />
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

SettingsScreen.navigationOptions = {
  title: 'Settings',
  headerShown: false,
  gestureEnabled: false,
}

export default SettingsScreen

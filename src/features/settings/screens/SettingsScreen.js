import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { signOut } from '../../../state/reducers/auth'
import { showSuccess, showError } from '../../../utils/toast'

const SettingsScreen = () => {
  const dispatch = useDispatch()
  const { isSigningOut } = useSelector(({ auth }) => ({
    isSigningOut: auth.isSigningOut,
  }))

  const handlePressOnSignOut = async () => {
    try {
      await dispatch(signOut())
      showSuccess('You have been successfully signed out')
    } catch (err) {
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

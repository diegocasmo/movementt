import React, { useEffect } from 'react'
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

const SettingsScreen = () => {
  const dispatch = useDispatch()
  const { isSigningOut, signingOutError } = useSelector(({ auth }) => ({
    isSigningOut: auth.isSigningOut,
    signingOutError: auth.signingOutError,
  }))

  useEffect(() => {
    if (signingOutError) {
      Toast.show({ text: signingOutError, type: 'danger', duration: 5000 })
    }
  }, [signingOutError])

  const handlePressOnSignOut = () => {
    dispatch(signOut())
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

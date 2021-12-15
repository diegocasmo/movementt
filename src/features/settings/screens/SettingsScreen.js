import React from 'react'
import PropTypes from 'prop-types'
import { Body, Container, Content, Header, Title } from 'native-base'
import { UnitSettings } from '../components/UnitSettings'
import { SecuritySettings } from '../components/SecuritySettings'

export const SettingsScreen = ({ navigation }) => (
  <Container>
    <Header>
      <Body>
        <Title>Settings</Title>
      </Body>
    </Header>
    <Content>
      <UnitSettings />
      <SecuritySettings navigation={navigation} />
    </Content>
  </Container>
)

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

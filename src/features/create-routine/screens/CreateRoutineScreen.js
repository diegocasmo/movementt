import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { Container, Header, Body, Title } from 'native-base'
import RoutineForm from '_components/routine-form/RoutineForm'
import { getUser } from '_state/reducers/auth'
import { showError } from '_utils/toast'
import { createRoutine } from '_state/reducers/routines'

const CreateRoutineScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUser)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (attrs, { resetForm }) => {
    setIsSubmitting(true)
    try {
      const action = await dispatch(createRoutine({ uid: user.uid, ...attrs }))
      unwrapResult(action)
      resetForm()
      navigation.navigate('RoutineItem', { routineKey: action.payload.key })
    } catch (err) {
      showError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuit = () => {
    navigation.navigate('Home')
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>Create Routine</Title>
        </Body>
      </Header>
      <RoutineForm
        autoFocus={true}
        isSubmitting={isSubmitting}
        onQuit={handleQuit}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default CreateRoutineScreen

CreateRoutineScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

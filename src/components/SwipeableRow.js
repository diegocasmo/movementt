import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated, StyleSheet, Text, View, I18nManager } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'

class SwipeableRow extends Component {
  renderRightAction = (text, color, x, progress, onPress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    })
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={onPress}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    )
  }

  renderRightActions = (progress) => {
    const { onDelete } = this.props

    return (
      <View
        style={[
          styles.rightActions,
          {
            width: 75,
            flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          },
        ]}
      >
        {this.renderRightAction('Delete', '#DD2C00', 75, progress, onDelete)}
      </View>
    )
  }

  updateRef = (ref) => {
    this._swipeableRow = ref
  }

  close = () => {
    this._swipeableRow.close()
  }

  render() {
    const { children } = this.props
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    )
  }
}

export default SwipeableRow

SwipeableRow.propTypes = {
  children: PropTypes.node,
  onDelete: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightActions: {
    marginLeft: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

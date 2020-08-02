import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Item, Input, Button, Text } from 'native-base'

const SearchForm = ({ style, onCreate }) => {
  return (
    <View style={[styles.header, style]}>
      <Item regular style={styles.item}>
        <Input placeholder="Search" />
      </Item>
      <Button primary style={styles.btn} onPress={onCreate}>
        <Text>+ Routine</Text>
      </Button>
    </View>
  )
}

export default SearchForm

SearchForm.propTypes = {
  style: PropTypes.object,
  onCreate: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  item: {
    flex: 1,
    height: 50,
  },
  btn: {
    marginLeft: 20,
    height: 50,
  },
})

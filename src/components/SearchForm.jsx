import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Item, Input, Button, Text, Icon } from 'native-base'

const SearchForm = ({ onChangeText, onCreate, query, style, btnText }) => {
  const handleClearQuery = () => {
    onChangeText('')
  }

  return (
    <View style={[styles.header, style]}>
      <Item regular style={styles.item}>
        <Input
          placeholder="Search"
          onChangeText={onChangeText}
          value={query}
        />
        <Button transparent onPress={handleClearQuery}>
          <Icon style={styles.icon} active name="md-close" />
        </Button>
      </Item>
      <Button primary style={styles.btn} onPress={onCreate}>
        <Text>{btnText}</Text>
      </Button>
    </View>
  )
}

export default SearchForm

SearchForm.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  style: PropTypes.object,
  btnText: PropTypes.string.isRequired,
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
  icon: {
    color: 'black',
  },
})

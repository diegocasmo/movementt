import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { View, Item, Input } from 'native-base'
import { Button, Icon } from '_components/ui'
import { useDebounce } from '_hooks/use-debounce'

const SearchForm = ({
  btnText,
  debounceThresholdMs,
  onChangeText,
  onCreate,
  query,
  style,
}) => {
  const [value, setValue] = useState(query)
  const debouncedValue = useDebounce(value, debounceThresholdMs)

  useEffect(() => {
    onChangeText(debouncedValue)
  }, [debouncedValue]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeText = (nextValue) => {
    setValue(nextValue)
  }

  const handleClearText = () => {
    handleChangeText('')
  }

  return (
    <View style={[styles.header, style]}>
      <Item regular style={styles.item}>
        <Input
          placeholder="Search"
          onChangeText={handleChangeText}
          value={value}
        />
        {!!value && (
          <Button
            colorScheme="transparent"
            onPress={handleClearText}
            icon={<Icon style={styles.icon} name="md-close" />}
          />
        )}
      </Item>
      <Button style={styles.btn} onPress={onCreate}>
        {btnText}
      </Button>
    </View>
  )
}

export default SearchForm

SearchForm.defaultProps = {
  debounceThresholdMs: 250,
}

SearchForm.propTypes = {
  btnText: PropTypes.string.isRequired,
  debounceThresholdMs: PropTypes.number,
  onChangeText: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  style: PropTypes.object,
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

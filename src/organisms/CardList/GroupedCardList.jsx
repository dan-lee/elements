import React from 'react'
import PropTypes from 'prop-types'
import CardList from './CardList'
import View from '@allthings/react-view'
import GroupTitle from '@allthings/elements/src/atoms/GroupTitle'

const GroupedCardList = ({ title, children, ...rest }) => {
  return (
    <View {...rest}>
      <GroupTitle>{title}</GroupTitle>
      <CardList>{children}</CardList>
    </View>
  )
}

GroupedCardList.propTypes = {
  /** See ListItem and View */
  children: PropTypes.node,
  e2e: PropTypes.string,
  /** The title for the CardList */
  title: PropTypes.string,
}

export default GroupedCardList

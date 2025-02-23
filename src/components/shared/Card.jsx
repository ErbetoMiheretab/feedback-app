import React from 'react'
import PropTypes from 'prop-types'


const Card = ({children, reverse}) => {
  return (
    <div className={`card ${reverse && 'reverse'}`}>{children}</div>
  )
}

Card.defaultProps = {
  reverse: false,
};

Card.propTypes = {
  Children: PropTypes.node,
  reverse: PropTypes.bool,
};

export default Card
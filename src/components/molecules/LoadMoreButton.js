import React from 'react'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const LoadMoreButton = ({ action }) => {
  return (
    <Button>
      <Box fontWeight='bold' onClick={action && action}>Load More</Box>
    </Button>
  )
}

export default LoadMoreButton

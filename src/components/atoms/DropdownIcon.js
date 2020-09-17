import React from 'react'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import { motion } from 'framer-motion'

const variants = {
  open: { rotate: 180 },
  closed: { rotate: 0 }
}

const DropdownIcon = ({ inverted }) => {
  return (
    <motion.div
      style={{ height: 24 }} animate={inverted ? 'open' : 'closed'}
      transition={{ ease: 'easeInOut' }}
      variants={variants}
    >
      <ExpandMoreRoundedIcon />
    </motion.div>
  )
}

export default DropdownIcon

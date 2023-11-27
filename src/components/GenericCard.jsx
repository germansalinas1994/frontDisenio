import React, { useContext } from 'react'
import { Card } from '@mui/material'
// import { ThemeContext } from '@emotion/react'
import ThemeContext from '../Layout/ThemeContext'
import { shadows } from '@mui/system';

function GenericCard({ children }) {
  const { isDarkTheme } = useContext(ThemeContext)
  return (
    <Card
      container
      sx={{
        backgroundColor: isDarkTheme ? '#000000' : '#F5F5F5',
        borderRadius: 2,
        padding: '20px 10px',
        display: 'flex',
        height: '450px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)'

      }}
    >
      {children}
    </Card>
  )
}

export default GenericCard
import React from 'react'
import SearchForm from '../Components/SearchForm'
import { Typography } from '@mui/material'

export default function SearchPage() {
  return (
    <div>
          <Typography marginY={6} textAlign={'center'} component="h1" variant="h5">
            Search Tweets
          </Typography>
        <SearchForm/>
    </div>
  )
}

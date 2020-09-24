import React from 'react'
import Select from 'react-styled-select'

export const TestPage = () => {
  const options = [
    { label: "One", value: 1},
    { label: "Two", value: 2},
  ]
  return (
    <Select
    multi={true}
    clearable={true}
    searchable={true}
      options={options}
      classes={{

      }}
    />
  )
} 




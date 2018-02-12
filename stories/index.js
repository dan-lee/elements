import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  FloatingButton,
  Form,
  FormValidityProvider,
  Text,
  TextInput,
  ThemeProvider,
  PhoneInput,
} from '../src/'

storiesOf('FloatingButton', module).add('with text', () => (
  <ThemeProvider>
    <FormValidityProvider
      validity={{
        valueMissing: 'YEYYYY, NOPEEEEEEEE!',
      }}
    >
      <Form onSubmit={_ => _}>
        <FloatingButton type="submit" onClick={action('clicked')}>
          <Text strong size="s" color="white">
            Hello Button
          </Text>
        </FloatingButton>
        <TextInput
          name="email"
          type="email"
          placeholder="Your email"
          required
        />
      </Form>
    </FormValidityProvider>
  </ThemeProvider>
))

storiesOf('PhoneInput', module).add('with phone', () => {

  return (
    <ThemeProvider>
      <Form>
        <PhoneInput defaultValue="490176" name="phone" id="phone" />
          <FloatingButton>
           <Text>get phone input value</Text> 
          </FloatingButton>
      </Form>
    </ThemeProvider>
  )

})
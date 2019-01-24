import { configure, shallow, render, mount } from 'enzyme'
import { createSerializer } from 'enzyme-to-json'
import { toMatchDiffSnapshot, getSnapshotDiffSerializer } from 'snapshot-diff'
import Adapter from 'enzyme-adapter-react-16'
import fetch from 'jest-fetch-mock'
import renderer from 'react-test-renderer'
import serializer, { fromDOMNode } from 'jest-glamor-react'
import genProps from 'react-generate-props'

// Adapter for React 16.
configure({ adapter: new Adapter() })

genProps.init()

// Add serializer for enzyme-to-json.
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }))

// Add serializer for jest-glamor-react and snapshot-diff.
expect.addSnapshotSerializer(getSnapshotDiffSerializer())
expect.addSnapshotSerializer(serializer)
expect.extend({ toMatchDiffSnapshot })

// Avoid annoying imports in all the tests.
global.fetch = fetch
global.mount = mount
global.render = render
global.renderer = renderer
global.shallow = shallow
global.fromDOMNode = fromDOMNode

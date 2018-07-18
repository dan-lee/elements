import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import Relative from '../atoms/Relative'

const inputStyle = css({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  opacity: 0.00001,
  pointerEvents: 'none',
})
// Use state controlled files, because file inputs are readonly.

const x = () => (
  <ThemeProvider>
    <FileSelector>
      {({ files, openDialog, getPreview, removeFile, reset }) => (
        <Form
          onSubmit={() => {
            console.log(files)
            reset()
          }}
        >
          <ul>
            {files.map(file => (
              <li key={file.name} onClick={() => removeFile(file)}>
                <img src={getPreview(file)} height={40} width={40} />
                {file.name}
              </li>
            ))}
          </ul>
        </Form>
      )}
    </FileSelector>
  </ThemeProvider>
)

/**
 The FileSelector component acts similar to <input type="file" /> but also provides useful tools to manage and display files.
 The child should be a function which gets in passed following parameters:
 |Parameter | Type | Description |
 |----------|:----:|------------:|
 |`files`|Array<[File](https://developer.mozilla.org/en-US/docs/Web/API/File)>|Array containing added files (originating from [`FileList`](https://developer.mozilla.org/en-US/docs/Web/API/FileList))
 |`openFileDialog`|Function|Triggers the browsers file dialog
 |`getFilePreview`|Function|Get a preview generated by the browser (only works for images)
 |`removeFile`|Function|Removes a file from the list
 |`resetFiles`|Function|Resets all files

 ```example
 <ThemeProvider>
   <FileSelector>
     {({ files, openFileDialog, getFilePreview, removeFile, resetFiles }) => (
       <Form
         onSubmit={() => {
           console.log(files)
           resetFiles()
         }}
       >
         <ul>
           {files.map(file => (
             <li key={file.name} onClick={() => removeFile(file)}>
               <img src={getFilePreview(file)} height={40} width={40} />
               {file.name}
             </li>
           ))}
         </ul>
       </Form>
     )}
   </FileSelector>
 </ThemeProvider>
 ```
 */
export default class FileSelector extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    /** Whether multiple files should be allowed **/
    multiple: PropTypes.bool,
    /** Whether this field is required **/
    required: PropTypes.bool,
    /** Accepted file types. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept **/
    accept: PropTypes.string,
    /** Called when one file or multiple files were added or removed **/
    onFileChange: PropTypes.func,
    /** DOM input change handler **/
    onChange: PropTypes.func,
  }

  static defaultProps = {
    onFileChange: () => {},
  }

  previews = new Map()

  componentWillUnmount() {
    this.clearPreviews()
  }

  state = {
    files: [],
  }

  setInputRef = ref => (this.inputRef = ref)

  handleFileChange = () => this.props.onFileChange(this.state.files)

  handleChange = e => {
    const fileItems = e.dataTransfer ? e.dataTransfer.files : e.target.files
    this.setState(
      state => ({ files: [...state.files, ...fileItems] }),
      this.handleFileChange
    )
  }

  openDialog = () => this.inputRef.click()

  clearPreviews = () => {
    this.previews.forEach(window.URL.revokeObjectURL)
    this.previews.clear()
  }

  reset = () => {
    this.inputRef.value = ''
    this.clearPreviews()
    this.setState({ files: [] }, this.handleFileChange)
  }

  remove = file => {
    this.setState(state => {
      const index = state.files.indexOf(file)

      if (index >= 0) {
        const files = [...state.files]
        files.splice(index, 1)
        this.previews.has(file) && this.previews.delete(file)
        return { files }
      }
      return null
    }, this.handleFileChange)
  }

  getPreview = file => {
    if (this.previews.has(file)) {
      return this.previews.get(file)
    } else {
      const url = window.URL.createObjectURL(file)
      this.previews.set(file, url)
      return url
    }
  }

  render() {
    const { children, accept, multiple, required } = this.props
    return (
      <Relative>
        <input
          ref={this.setInputRef}
          type="file"
          {...inputStyle}
          accept={accept}
          multiple={multiple}
          required={required}
          onChange={this.handleChange}
        />
        {children({
          files: this.state.files,
          openFileDialog: this.openDialog,
          getFilePreview: this.getPreview,
          removeFile: this.remove,
          resetFiles: this.reset,
        })}
      </Relative>
    )
  }
}

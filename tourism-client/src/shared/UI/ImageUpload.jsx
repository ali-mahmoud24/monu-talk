// import React from 'react';

// import { Card, Button, Grid } from '@mui/material';

// //Tabs
// // import { withStyles } from '@material-ui/core/styles';

// // const styles = (theme) => ({
// //   root: {
// //     width: 500,
// //     display: 'flex',
// //     justifyContent: 'center',
// //     alignItems: 'flex-end',
// //   },
// //   input: {
// //     display: 'none',
// //   },
// //   img: {
// //     width: 200,
// //     height: 256,
// //     margin: 'auto',
// //     display: 'block',
// //     maxWidth: '100%',
// //     maxHeight: '100%',
// //   },
// // });

// class ImageUploadCard extends React.Component {
//   state = {
//     mainState: 'initial', // initial
//     imageUploaded: 0,
//     selectedFile: 'avatar.jpg',
//   };

//   handleUploadClick = (event) => {
//     console.log();
//     var file = event.target.files[0];
//     const reader = new FileReader();
//     var url = reader.readAsDataURL(file);

//     reader.onloadend = function (e) {
//       this.setState({
//         selectedFile: [reader.result],
//       });
//     }.bind(this);
//     console.log(url); // Would see a path?

//     this.setState({
//       mainState: 'uploaded',
//       selectedFile: event.target.files[0],
//       imageUploaded: 1,
//     });
//   };

//   renderInitialState() {
//     // const { classes, theme } = this.props;
//     const { value } = this.state;

//     return (
//       <Grid container direction="column" alignItems="center">
//         <Grid item>
//           <img
//             width="100%"
//             style={{
//               width: 200,
//               height: 256,
//               margin: 'auto',
//               display: 'block',
//               maxWidth: '100%',
//               maxHeight: '100%',
//             }}
//             src={this.state.selectedFile}
//           />
//         </Grid>
//         <label htmlFor="contained-button-file">
//           <Button variant="contained" component="span">
//             Select Image
//             <input
//               accept="image/*"
//               style={{
//                 display: 'none',
//               }}
//               id="contained-button-file"
//               multiple
//               type="file"
//               onChange={this.handleUploadClick}
//             />
//           </Button>
//         </label>
//       </Grid>
//     );
//   }

//   renderUploadedState() {
//     // const { classes, theme } = this.props;

//     return (
//       <Grid container direction="column" alignItems="center">
//         <Grid item>
//           <img
//             width="100%"
//             style={{
//               width: 200,
//               height: 256,
//               margin: 'auto',
//               display: 'block',
//               maxWidth: '100%',
//               maxHeight: '100%',
//             }}
//             src={this.state.selectedFile}
//           />
//         </Grid>
//         <label htmlFor="contained-button-file">
//           <Button variant="contained" component="span">
//             Select Image
//             <input
//               accept="image/*"
//               style={{
//                 display: 'none',
//               }}
//               id="contained-button-file"
//               multiple
//               type="file"
//               onChange={this.handleUploadClick}
//             />
//           </Button>
//         </label>
//       </Grid>
//     );
//   }

//   render() {
//     // const { classes, theme } = this.props;

//     return (
//       <div
//         style={{
//           width: 500,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'flex-end',
//         }}
//       >
//         <Card
//           style={{ background: 'black', width: '100%' }}
//           className={this.props.cardName}
//         >
//           {(this.state.mainState == 'initial' && this.renderInitialState()) ||
//             (this.state.mainState == 'uploaded' && this.renderUploadedState())}
//         </Card>
//       </div>
//     );
//   }
// }

// export default ImageUploadCard;

// import React, { useRef, useState, useEffect } from 'react';

// // import Button from './Button';
// import { Button } from '@mui/material';
// import './ImageUpload.css';

// const ImageUpload = (props) => {
//   const [file, setFile] = useState();
//   const [previewUrl, setPreviewUrl] = useState();
//   const [isValid, setIsValid] = useState(false);

//   const filePickerRef = useRef();

//   useEffect(() => {
//     if (!file) {
//       return;
//     }
//     const fileReader = new FileReader();
//     fileReader.onload = () => {
//       setPreviewUrl(fileReader.result);
//     };
//     fileReader.readAsDataURL(file);
//   }, [file]);

//   const pickedHandler = (event) => {
//     let pickedFile;
//     let fileIsValid = isValid;
//     if (event.target.files && event.target.files.length === 1) {
//       pickedFile = event.target.files[0];
//       setFile(pickedFile);
//       setIsValid(true);
//       fileIsValid = true;
//     } else {
//       setIsValid(false);
//       fileIsValid = false;
//     }
//     props.onInput(props.id, pickedFile, fileIsValid);
//   };

//   const pickImageHandler = () => {
//     filePickerRef.current.click();
//   };

//   return (
//     <div className="form-control">
//       <input
//         id={props.id}
//         ref={filePickerRef}
//         style={{ display: 'none' }}
//         type="file"
//         accept=".jpg,.png,.jpeg"
//         onChange={pickedHandler}
//       />
//       <div className={`image-upload ${props.center && 'center'}`}>
//         <div className="image-upload__preview">
//           {previewUrl && <img src={previewUrl} alt="Preview" />}
//           {!previewUrl && <p>Please pick an image.</p>}
//         </div>
//         <div className="center">
//           <Button onClick={pickImageHandler}>
//             PICK IMAGE
//           </Button>
//         </div>
//       </div>
//       {/* {!isValid && <p>{props.errorText}</p>} */}
//     </div>
//   );
// };

// export default ImageUpload;

import React from 'react';
import ImageUploading from 'react-images-uploading';

export default function ImageUpload() {
  const [images, setImages] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

// write me complete code to post a file using react and accept it throught laravel and store it. use react functional component.

// React Functional Component:

// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const onChange = e => {
//     setFile(e.target.files[0]);
//     setFileName(e.target.files[0].name);
//   };

//   const onSubmit = async e => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await axios.post('http://localhost:8000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       const { fileName, filePath } = res.data;
//       setUploadedFile({ fileName, filePath });
//     } catch (err) {
//       if (err.response.status === 500) {
//         console.log('There was a problem with the server');
//       } else {
//         console.log(err.response.data.msg);
//       }
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <div className='custom-file mb-4'>
//           <input
//             type='file'
//             className='custom-file-input'
//             id='customFile'
//             onChange={onChange}
//           />
//           <label className='custom-file-label' htmlFor='customFile'>
//             {fileName}
//           </label>
//         </div>
//         <input type='submit' value='Upload' className='btn btn-primary btn-block' />
//       </form>
//       {uploadedFile && (
//         <div className='row mt-5'>
//           <div className='col-md-6 m-auto'>
//             <h3 className='text-center'>{uploadedFile.fileName}</h3>
//             <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;

// Laravel:

// use Illuminate\Http\Request;

// public function upload(Request $request) {
    
//     // Validate the file
//     $request->validate([
//         'file' => 'required|file|max:1024',
//     ]);
    
//     // Store the file
//     $file = $request->file('file');
//     $fileName = Str::random(10).'.'.$file->getClientOriginalExtension();
//     $file->storeAs('files', $fileName);

//     return response()->json([
//         'fileName' => $fileName,
//         'filePath' => asset('files/'.$fileName),
//     ]);
// }
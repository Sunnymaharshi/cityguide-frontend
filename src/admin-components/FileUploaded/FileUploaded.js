import React,{useRef} from 'react'


export const FileUploaded = ({onFileSelect}) => {
        const fileInput = useRef(null)
    
        const handleFileInput = (e) => {
        onFileSelect(e.target.files[0]);
        }
    
        return (
        
            <div className="file-uploader">
                <label htmlFor="chooseimage">Choose Image</label>
                <input type="file" name="chooseimage"onChange={handleFileInput} className="form-control"></input>
            </div>
            
        )
    }



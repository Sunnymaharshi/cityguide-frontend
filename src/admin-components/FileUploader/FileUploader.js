import React,{useRef} from 'react'


export const FileUploader = ({onFileSelect}) => {
        const fileInput = useRef(null)
    
        const handleFileInput = (e) => {
            // handle validations
            onFileSelect(e.target.files[0]);
        }
    
        return (
        
            <div className="file-uploader">
                <input type="file" name="chooseimage"onChange={handleFileInput}></input>
            </div>
            
        )
    }



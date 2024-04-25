import React,{useState} from 'react'


const ImageCropper = () => {
    const [proPic, setProPic] = useState(null)
    const handleImageChange = (event) => {
        setProPic(event.target.files[0])
    }

    const reader = new FileReader()
    reader.addEventListener("load",()=>{
        const imageUrl = reader.result?.toString() || "";
        console.log(imageUrl)
    })
    return (
        <>
            <div className="card-body text-center">
                <img
                    src={(proPic instanceof Blob ? URL.createObjectURL(proPic) : null) || "/images/user.png"}
                    alt="avatar"
                    className=" img-fluid"
                    style={{ width: '150px', borderRadius: '50%' }}
                />
            </div>
            <form >
                <div className="d-flex justify-content-center mb-2">
                    <input className='form-control btn btn-success btn-md' type="file" accept="image/png, image/jpeg"
                        onChange={handleImageChange} />
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <button type="submit" className="btn btn-primary btn-secondary"> save </button>
                </div>
            </form>
        </>
    )
}

export default ImageCropper
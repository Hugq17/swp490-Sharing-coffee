import React, { useState, useEffect, useRef } from 'react'
import { Container, FormGroup, Input } from 'reactstrap'
function UploadImg() {
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(false)

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'dating')
        setLoading(true)
        const res = await fetch(
            "http://api.cloudinary.com/v1_1/durpvwfnl/image/upload",
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        setLoading(false)
    }
    const containerRef = useRef(null)

    return (
        <div>
            <Container>
                <FormGroup>
                    <Input
                        type='file'
                        name='file'
                        placeholder='Upload file'
                        onChange={uploadImage}
                    />

                </FormGroup>
            </Container>
        </div>
    )
}

export default UploadImg

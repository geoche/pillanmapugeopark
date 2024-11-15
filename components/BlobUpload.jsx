'use client';

import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

export default function BlobUpload() {
    const inputFileRef = useRef(null);
    const [blob, setBlob] = useState(null);
    return (
        <>
            <h1>Upload Your BackgroundVideo</h1>

            <form
                onSubmit={async (event) => {
                    event.preventDefault();

                    const file = inputFileRef.current.files[0];

                    const newBlob = await upload(file.name, file, {
                        access: 'public',
                        handleUploadUrl: '/api/bgvideo/upload',
                    });

                    setBlob(newBlob);
                }}
            >
                <input name="file" ref={inputFileRef} type="file" required />
                <button type="submit">Upload</button>
            </form>
            {blob && (
                <div>
                    Blob url: <a href={blob.url}>{blob.url}</a>
                </div>
            )}
        </>
    );
}